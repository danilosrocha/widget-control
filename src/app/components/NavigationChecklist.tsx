import { Box, Chip, Tooltip } from '@mui/material';
import { Check, X } from 'lucide-react';
import { NavigationItem } from '../types/widget';

interface NavigationChecklistProps {
  items: NavigationItem[];
  compact?: boolean;
}

export function NavigationChecklist({ items, compact = false }: NavigationChecklistProps) {
  // Garantir que items é sempre um array válido
  const validItems = Array.isArray(items) ? items : [];

  if (!validItems || validItems.length === 0) {
    return <Box sx={{ color: 'text.secondary' }}>—</Box>;
  }

  const completed = validItems.filter((item) => item.completed).length;
  const total = validItems.length;

  if (compact) {
    return (
      <Tooltip
        title={
          <Box>
            {validItems.map((item, index) => (
              <Box key={`nav-tooltip-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, py: 0.25 }}>
                {item.completed ? (
                  <Check size={14} color="#4caf50" />
                ) : (
                  <X size={14} color="#f44336" />
                )}
                <span>{item.text}</span>
              </Box>
            ))}
          </Box>
        }
      >
        <Chip
          label={`${completed}/${total}`}
          size="small"
          sx={{
            bgcolor: completed === total ? '#4caf50' : completed > 0 ? '#ff9800' : '#f44336',
            color: 'white',
            fontWeight: 600,
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {validItems.map((item, index) => (
        <Box key={`nav-item-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {item.completed ? (
            <Check size={16} color="#4caf50" />
          ) : (
            <X size={16} color="#f44336" />
          )}
          <Box
            sx={{
              fontSize: '0.875rem',
              textDecoration: item.completed ? 'line-through' : 'none',
              color: item.completed ? 'text.secondary' : 'text.primary',
            }}
          >
            {item.text}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
