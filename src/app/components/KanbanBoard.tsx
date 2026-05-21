import { Box, Paper, Typography, Button } from '@mui/material';
import { Plus } from 'lucide-react';
import { Improvement, STATUS_COLUMNS } from '../types/improvement';
import { ImprovementCard } from './ImprovementCard';

interface KanbanBoardProps {
  improvements: Improvement[];
  onEdit: (improvement: Improvement) => void;
  onDelete: (id: string) => void;
  onAddNew: (status: Improvement['status']) => void;
}

export function KanbanBoard({ improvements, onEdit, onDelete, onAddNew }: KanbanBoardProps) {
  const getImprovementsByStatus = (status: Improvement['status']) => {
    return improvements.filter((imp) => imp.status === status);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3,
        mt: 3,
      }}
    >
      {STATUS_COLUMNS.map((column) => {
        const columnImprovements = getImprovementsByStatus(column.value);
        return (
          <Paper
            key={column.value}
            elevation={2}
            sx={{
              p: 2,
              bgcolor: '#fafafa',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                pb: 2,
                borderBottom: `3px solid ${column.color}`,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: column.color }}>
                  {column.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {columnImprovements.length} {columnImprovements.length === 1 ? 'item' : 'itens'}
                </Typography>
              </Box>
              <Button
                size="small"
                startIcon={<Plus size={16} />}
                onClick={() => onAddNew(column.value)}
                sx={{
                  minWidth: 'auto',
                  color: column.color,
                  '&:hover': { bgcolor: `${column.color}15` },
                }}
              >
                Adicionar
              </Button>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              {columnImprovements.length === 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    color: 'text.secondary',
                  }}
                >
                  <Typography variant="body2">Nenhum item nesta coluna</Typography>
                </Box>
              ) : (
                columnImprovements.map((improvement) => (
                  <ImprovementCard
                    key={improvement.id}
                    improvement={improvement}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
