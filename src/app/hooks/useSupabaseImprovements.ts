import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Improvement } from '../types/improvement';
import { initialImprovements } from '../data/initialImprovements';

export function useSupabaseImprovements() {
  const [improvements, setImprovements] = useState<Improvement[]>(initialImprovements);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar melhorias do Supabase
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      loadImprovements();
    } else {
      setError('Supabase não configurado. Usando dados locais.');
      setLoading(false);
    }
  }, []);

  // Converter snake_case do banco para camelCase do TypeScript
  const mapFromDb = (dbItem: any): Improvement => ({
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description,
    status: dbItem.status,
    createdAt: dbItem.created_at,
  });

  // Converter camelCase do TypeScript para snake_case do banco
  const mapToDb = (item: Improvement) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.status,
    created_at: item.createdAt,
  });

  const loadImprovements = async () => {
    if (!supabase) {
      setError('Supabase não configurado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('improvements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setImprovements(data.map(mapFromDb));
      }
    } catch (err: any) {
      console.error('Erro ao carregar melhorias:', err);
      setError(err.message);
      // Em caso de erro, usar dados locais como fallback
      setImprovements(initialImprovements);
    } finally {
      setLoading(false);
    }
  };

  const addImprovement = async (improvement: Improvement) => {
    if (!supabase) {
      // Fallback: adicionar localmente
      setImprovements([...improvements, improvement]);
      return { success: true, data: improvement };
    }

    try {
      const { data, error } = await supabase
        .from('improvements')
        .insert([mapToDb(improvement)])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const mapped = mapFromDb(data);
        setImprovements([...improvements, mapped]);
        return { success: true, data: mapped };
      }
      return { success: true, data: improvement };
    } catch (err: any) {
      console.error('Erro ao adicionar melhoria:', err);
      return { success: false, error: err.message };
    }
  };

  const updateImprovement = async (improvement: Improvement) => {
    if (!supabase) {
      // Fallback: atualizar localmente
      setImprovements(improvements.map((i) => (i.id === improvement.id ? improvement : i)));
      return { success: true, data: improvement };
    }

    try {
      const { data, error } = await supabase
        .from('improvements')
        .update(mapToDb(improvement))
        .eq('id', improvement.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const mapped = mapFromDb(data);
        setImprovements(improvements.map((i) => (i.id === improvement.id ? mapped : i)));
        return { success: true, data: mapped };
      }
      return { success: true, data: improvement };
    } catch (err: any) {
      console.error('Erro ao atualizar melhoria:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteImprovement = async (id: string) => {
    if (!supabase) {
      // Fallback: deletar localmente
      setImprovements(improvements.filter((i) => i.id !== id));
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('improvements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setImprovements(improvements.filter((i) => i.id !== id));
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao deletar melhoria:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    improvements,
    loading,
    error,
    addImprovement,
    updateImprovement,
    deleteImprovement,
    refreshImprovements: loadImprovements,
  };
}
