import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Improvement, STATUS_COLUMNS } from '../types/improvement';

interface ImprovementDialogProps {
  open: boolean;
  improvement: Improvement | null;
  onClose: () => void;
  onSave: (improvement: Improvement) => void;
}

export function ImprovementDialog({ open, improvement, onClose, onSave }: ImprovementDialogProps) {
  const [formData, setFormData] = useState<Partial<Improvement>>({
    title: '',
    description: '',
    status: 'backlog',
  });

  useEffect(() => {
    if (improvement) {
      setFormData({
        title: improvement.title || '',
        description: improvement.description || '',
        status: improvement.status || 'backlog',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'backlog',
      });
    }
  }, [improvement, open]);

  const handleSubmit = () => {
    if (formData.title) {
      onSave({
        ...formData,
        id: improvement?.id || Date.now().toString(),
        createdAt: improvement?.createdAt || new Date().toISOString(),
      } as Improvement);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#003D7A', color: 'white' }}>
        {improvement ? 'Editar Melhoria' : 'Nova Melhoria'}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Título"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Descrição"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Improvement['status'] })}
            >
              {STATUS_COLUMNS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.title}
          sx={{ bgcolor: '#003D7A', '&:hover': { bgcolor: '#002856' } }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
