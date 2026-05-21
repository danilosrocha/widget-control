import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import { Widget, STATUS_OPTIONS } from '../types/widget';
import { NavigationChecklist } from './NavigationChecklist';

interface WidgetDetailDialogProps {
  open: boolean;
  widget: Widget | null;
  onClose: () => void;
  onEdit: (widget: Widget) => void;
}

export function WidgetDetailDialog({ open, widget, onClose, onEdit }: WidgetDetailDialogProps) {
  if (!widget) return null;

  const statusConfig = STATUS_OPTIONS.find((s) => s.value === widget.status) || STATUS_OPTIONS[2];

  const handleEdit = () => {
    onEdit(widget);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: '#003D7A', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
        Detalhes do Widget
      </DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Identifier
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'monospace',
                bgcolor: '#f5f5f5',
                p: 1,
                borderRadius: 1,
                mt: 0.5
              }}
            >
              {widget.identifier}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Nome
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {widget.name || '—'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Segmento
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={widget.segment}
                  sx={{ bgcolor: '#FFED00', color: '#003D7A', fontWeight: 'bold' }}
                />
              </Box>
            </Box>

            <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Navegação
              </Typography>
              <Box sx={{ mt: 1 }}>
                <NavigationChecklist items={widget.navigation} />
              </Box>
            </Box>

            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Status
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={statusConfig.label}
                  sx={{
                    bgcolor: statusConfig.color,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              O que falta
            </Typography>
            <Box
              sx={{
                mt: 1,
                p: 2,
                bgcolor: '#f9f9f9',
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                minHeight: 60
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {widget.missing || 'Nenhuma informação'}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Bugs
            </Typography>
            <Box
              sx={{
                mt: 1,
                p: 2,
                bgcolor: widget.bugs ? '#fff3e0' : '#f9f9f9',
                borderRadius: 1,
                border: widget.bugs ? '1px solid #ffb74d' : '1px solid #e0e0e0',
                minHeight: 60
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {widget.bugs || 'Nenhum bug reportado'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Fechar
        </Button>
        <Button
          onClick={handleEdit}
          variant="contained"
          sx={{ bgcolor: '#0075C9', '&:hover': { bgcolor: '#005a9e' } }}
        >
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
