import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Widget } from '../types/widget';
import { initialWidgets } from '../data/initialWidgets';

export function useSupabaseWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar widgets do Supabase
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      loadWidgets();
    } else {
      setError('Supabase não configurado. Usando dados locais.');
      setLoading(false);
    }
  }, []);

  const loadWidgets = async () => {
    if (!supabase) {
      setError('Supabase não configurado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('widgets')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setWidgets(data as Widget[]);
      } else {
        // Se não houver dados, inserir dados iniciais
        await initializeData();
      }
    } catch (err: any) {
      console.error('Erro ao carregar widgets:', err);
      setError(err.message);
      // Em caso de erro, usar dados locais como fallback
      setWidgets(initialWidgets);
    } finally {
      setLoading(false);
    }
  };

  const initializeData = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('widgets')
        .insert(initialWidgets)
        .select();

      if (error) throw error;

      if (data) {
        setWidgets(data as Widget[]);
      }
    } catch (err: any) {
      console.error('Erro ao inicializar dados:', err);
      setWidgets(initialWidgets);
    }
  };

  const addWidget = async (widget: Widget) => {
    if (!supabase) {
      // Fallback: adicionar localmente
      setWidgets([...widgets, widget]);
      return { success: true, data: widget };
    }

    try {
      const { data, error } = await supabase
        .from('widgets')
        .insert([widget])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setWidgets([...widgets, data as Widget]);
      }
      return { success: true, data };
    } catch (err: any) {
      console.error('Erro ao adicionar widget:', err);
      return { success: false, error: err.message };
    }
  };

  const updateWidget = async (widget: Widget) => {
    if (!supabase) {
      // Fallback: atualizar localmente
      setWidgets(widgets.map((w) => (w.id === widget.id ? widget : w)));
      return { success: true, data: widget };
    }

    try {
      const { data, error } = await supabase
        .from('widgets')
        .update(widget)
        .eq('id', widget.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setWidgets(widgets.map((w) => (w.id === widget.id ? (data as Widget) : w)));
      }
      return { success: true, data };
    } catch (err: any) {
      console.error('Erro ao atualizar widget:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteWidget = async (id: string) => {
    if (!supabase) {
      // Fallback: deletar localmente
      setWidgets(widgets.filter((w) => w.id !== id));
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('widgets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWidgets(widgets.filter((w) => w.id !== id));
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao deletar widget:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    widgets,
    loading,
    error,
    addWidget,
    updateWidget,
    deleteWidget,
    refreshWidgets: loadWidgets,
  };
}
