import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verificar se as credenciais estão configuradas
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Criar cliente apenas se as credenciais estiverem disponíveis
// Caso contrário, criar um cliente mock que não fará nada
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Tipos do banco de dados
export interface Database {
  public: {
    Tables: {
      widgets: {
        Row: {
          id: string;
          identifier: string;
          name: string;
          order: number;
          required: boolean;
          segment: string;
          navigation: { text: string; completed: boolean }[];
          status: string;
          missing: string;
          bugs: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['widgets']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['widgets']['Insert']>;
      };
      improvements: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['improvements']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['improvements']['Insert']>;
      };
    };
  };
}
