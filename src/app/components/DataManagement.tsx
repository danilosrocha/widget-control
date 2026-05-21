import { Box, Button, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Download, Upload, Trash2, Database } from 'lucide-react';
import { useState } from 'react';
import { Widget } from '../types/widget';
import { Improvement } from '../types/improvement';

interface DataManagementProps {
  widgets: Widget[];
  improvements: Improvement[];
  onImport: (data: { widgets: Widget[]; improvements: Improvement[] }) => void;
  onClearAll: () => void;
}

export function DataManagement({ widgets, improvements, onImport, onClearAll }: DataManagementProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleExport = () => {
    const data = {
      widgets,
      improvements,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `widget-control-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.widgets && data.improvements) {
          onImport(data);
        } else {
          alert('Arquivo inválido! Certifique-se de importar um backup válido.');
        }
      } catch (error) {
        alert('Erro ao ler o arquivo. Certifique-se de que é um arquivo JSON válido.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    setConfirmOpen(true);
  };

  const confirmClear = () => {
    onClearAll();
    setConfirmOpen(false);
  };

  return (
    <Paper sx={{ p: 2, mb: 3, bgcolor: '#f9f9f9' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <Database size={20} color="#003D7A" />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#003D7A' }}>
              Gerenciar Dados
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {widgets.length} widgets • {improvements.length} melhorias
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<Download size={16} />}
            onClick={handleExport}
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Exportar
          </Button>
          <Button
            size="small"
            startIcon={<Upload size={16} />}
            component="label"
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Importar
            <input type="file" hidden accept=".json" onChange={handleImport} />
          </Button>
          <Button
            size="small"
            startIcon={<Trash2 size={16} />}
            onClick={handleClearAll}
            variant="outlined"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Limpar Tudo
          </Button>
        </Box>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ bgcolor: '#d32f2f', color: 'white' }}>
          ⚠️ Confirmar Exclusão
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>
            Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita.
          </Typography>
          <Typography sx={{ mt: 2, color: 'error.main', fontWeight: 600 }}>
            Recomendamos exportar um backup antes de continuar.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={confirmClear} color="error" variant="contained">
            Sim, Limpar Tudo
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
