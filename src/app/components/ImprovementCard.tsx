import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { Improvement } from '../types/improvement';

interface ImprovementCardProps {
  improvement: Improvement;
  onEdit: (improvement: Improvement) => void;
  onDelete: (id: string) => void;
}

export function ImprovementCard({ improvement, onEdit, onDelete }: ImprovementCardProps) {
  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 4,
          bgcolor: '#f9f9f9',
        },
      }}
      onClick={() => onEdit(improvement)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, color: '#003D7A' }}>
            {improvement.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }} onClick={(e) => e.stopPropagation()}>
            <IconButton size="small" onClick={() => onEdit(improvement)} sx={{ color: '#0075C9' }}>
              <Edit size={16} />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(improvement.id)} sx={{ color: '#d32f2f' }}>
              <Trash2 size={16} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
          {improvement.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          {new Date(improvement.createdAt).toLocaleDateString('pt-BR')}
        </Typography>
      </CardContent>
    </Card>
  );
}
