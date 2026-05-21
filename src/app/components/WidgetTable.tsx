import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { Widget, STATUS_OPTIONS } from '../types/widget';
import { NavigationChecklist } from './NavigationChecklist';

interface WidgetTableProps {
  widgets: Widget[];
  onEdit: (widget: Widget) => void;
  onDelete: (id: string) => void;
  onViewDetails: (widget: Widget) => void;
}

export function WidgetTable({ widgets, onEdit, onDelete, onViewDetails }: WidgetTableProps) {
  const getStatusConfig = (status: Widget['status']) => {
    return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[2];
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead sx={{ bgcolor: '#003D7A' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>#</TableCell>
            <TableCell sx={{ color: 'white' }}>Identifier</TableCell>
            <TableCell sx={{ color: 'white' }}>Nome</TableCell>
            <TableCell sx={{ color: 'white' }}>Segmento</TableCell>
            <TableCell sx={{ color: 'white' }}>Navegação</TableCell>
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white' }}>O que falta</TableCell>
            <TableCell sx={{ color: 'white' }}>Bugs</TableCell>
            <TableCell sx={{ color: 'white' }} align="center">
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {widgets.map((widget, index) => {
            const statusConfig = getStatusConfig(widget.status);
            return (
              <TableRow
                key={widget.id}
                onClick={() => onViewDetails(widget)}
                sx={{
                  '&:nth-of-type(odd)': { bgcolor: '#f5f5f5' },
                  '&:hover': { bgcolor: '#e3f2fd', cursor: 'pointer' },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    {widget.identifier}
                  </Box>
                </TableCell>
                <TableCell>{widget.name || '—'}</TableCell>
                <TableCell>
                  <Chip label={widget.segment} size="small" sx={{ bgcolor: '#FFED00', color: '#003D7A' }} />
                </TableCell>
                <TableCell>
                  <NavigationChecklist items={widget.navigation} compact />
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusConfig.label}
                    size="small"
                    sx={{
                      bgcolor: statusConfig.color,
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell>
                  {widget.missing ? (
                    <Tooltip title={widget.missing}>
                      <Box
                        sx={{
                          maxWidth: 150,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {widget.missing}
                      </Box>
                    </Tooltip>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell>
                  {widget.bugs ? (
                    <Tooltip title={widget.bugs}>
                      <Box
                        sx={{
                          maxWidth: 150,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {widget.bugs}
                      </Box>
                    </Tooltip>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(widget)}
                      sx={{ color: '#0075C9' }}
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(widget.id)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
