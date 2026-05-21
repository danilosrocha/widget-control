export interface Improvement {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'completed';
  createdAt: string;
}

export const STATUS_COLUMNS = [
  { value: 'backlog', label: 'Backlog', color: '#607d8b' },
  { value: 'in-progress', label: 'Em Andamento', color: '#0075C9' },
  { value: 'completed', label: 'Concluído', color: '#4caf50' },
] as const;
