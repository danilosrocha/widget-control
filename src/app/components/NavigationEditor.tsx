import { Box, TextField, IconButton, Checkbox, FormControlLabel, Button, Paper } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
import { NavigationItem } from '../types/widget';

interface NavigationEditorProps {
  items: NavigationItem[];
  onChange: (items: NavigationItem[]) => void;
}

export function NavigationEditor({ items, onChange }: NavigationEditorProps) {
  // Garantir que items é sempre um array válido
  const validItems = Array.isArray(items) ? items : [];

  const handleAddItem = () => {
    onChange([...validItems, { text: '', completed: false }]);
  };

  const handleRemoveItem = (index: number) => {
    onChange(validItems.filter((_, i) => i !== index));
  };

  const handleTextChange = (index: number, text: string) => {
    const newItems = [...validItems];
    newItems[index].text = text;
    onChange(newItems);
  };

  const handleCompletedChange = (index: number, completed: boolean) => {
    const newItems = [...validItems];
    newItems[index].completed = completed;
    onChange(newItems);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Navegações</Box>
        <Button size="small" startIcon={<Plus size={16} />} onClick={handleAddItem}>
          Adicionar
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {validItems.length === 0 ? (
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: '#f5f5f5',
              border: '1px dashed #ccc',
            }}
          >
            <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              Nenhuma navegação adicionada
            </Box>
          </Paper>
        ) : (
          validItems.map((item, index) => (
            <Box
              key={`nav-editor-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                bgcolor: '#f9f9f9',
                borderRadius: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.completed}
                    onChange={(e) => handleCompletedChange(index, e.target.checked)}
                    size="small"
                  />
                }
                label=""
                sx={{ m: 0 }}
              />
              <TextField
                value={item.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder="Descrição da navegação"
                size="small"
                fullWidth
              />
              <IconButton size="small" onClick={() => handleRemoveItem(index)} sx={{ color: '#d32f2f' }}>
                <Trash2 size={16} />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
