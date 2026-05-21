import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { Widget, STATUS_OPTIONS, SEGMENT_OPTIONS } from '../types/widget';
import { NavigationEditor } from './NavigationEditor';

interface WidgetDialogProps {
  open: boolean;
  widget: Widget | null;
  onClose: () => void;
  onSave: (widget: Widget) => void;
}

export function WidgetDialog({ open, widget, onClose, onSave }: WidgetDialogProps) {
  const [formData, setFormData] = useState<Partial<Widget>>({
    identifier: '',
    name: '',
    segment: 'Todos',
    navigation: [],
    status: 'verify',
    missing: '',
    bugs: '',
  });

  useEffect(() => {
    if (widget) {
      // Garantir que navigation seja sempre um array
      setFormData({
        ...widget,
        navigation: Array.isArray(widget.navigation) ? widget.navigation : [],
      });
    } else {
      setFormData({
        identifier: '',
        name: '',
        segment: 'Todos',
        navigation: [],
        status: 'verify',
        missing: '',
        bugs: '',
      });
    }
  }, [widget, open]);

  const handleSubmit = () => {
    if (formData.identifier) {
      onSave({
        ...formData,
        id: widget?.id || Date.now().toString(),
        order: widget?.order || 0,
        required: widget?.required || false,
      } as Widget);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: '#003D7A', color: 'white' }}>
        {widget ? 'Editar Widget' : 'Novo Widget'}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Identifier"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Segmento</InputLabel>
            <Select
              value={formData.segment}
              label="Segmento"
              onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
            >
              {SEGMENT_OPTIONS.map((seg) => (
                <MenuItem key={seg} value={seg}>
                  {seg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <NavigationEditor
            items={Array.isArray(formData.navigation) ? formData.navigation : []}
            onChange={(navigation) => setFormData({ ...formData, navigation })}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Widget['status'] })}
            >
              {STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="O que falta"
            value={formData.missing}
            onChange={(e) => setFormData({ ...formData, missing: e.target.value })}
            multiline
            rows={2}
            fullWidth
          />
          <TextField
            label="Bugs"
            value={formData.bugs}
            onChange={(e) => setFormData({ ...formData, bugs: e.target.value })}
            multiline
            rows={2}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: '#003D7A', '&:hover': { bgcolor: '#002856' } }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
