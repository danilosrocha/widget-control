import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Snackbar,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Plus, Kanban, RefreshCw } from 'lucide-react';
import { WidgetTable } from './components/WidgetTable';
import { WidgetDialog } from './components/WidgetDialog';
import { WidgetDetailDialog } from './components/WidgetDetailDialog';
import { FilterBar } from './components/FilterBar';
import { KanbanBoard } from './components/KanbanBoard';
import { ImprovementDialog } from './components/ImprovementDialog';
import { Widget } from './types/widget';
import { Improvement } from './types/improvement';
import { useSupabaseWidgets } from './hooks/useSupabaseWidgets';
import { useSupabaseImprovements } from './hooks/useSupabaseImprovements';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Hooks do Supabase
  const {
    widgets,
    loading: widgetsLoading,
    error: widgetsError,
    addWidget,
    updateWidget,
    deleteWidget,
    refreshWidgets,
  } = useSupabaseWidgets();

  const {
    improvements,
    loading: improvementsLoading,
    error: improvementsError,
    addImprovement,
    updateImprovement,
    deleteImprovement,
    refreshImprovements,
  } = useSupabaseImprovements();

  // Estados para UI
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [viewingWidget, setViewingWidget] = useState<Widget | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('all');

  const [improvementDialogOpen, setImprovementDialogOpen] = useState(false);
  const [editingImprovement, setEditingImprovement] = useState<Improvement | null>(null);
  const [newImprovementStatus, setNewImprovementStatus] = useState<Improvement['status'] | null>(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Filtrar e ordenar widgets
  const filteredWidgets = useMemo(() => {
    return widgets
      .filter((widget) => {
        const matchesSearch =
          widget.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || widget.status === statusFilter;
        const matchesSegment = segmentFilter === 'all' || widget.segment === segmentFilter;
        return matchesSearch && matchesStatus && matchesSegment;
      })
      .sort((a, b) => a.order - b.order);
  }, [widgets, searchTerm, statusFilter, segmentFilter]);


  const handleSave = async (widget: Widget) => {
    if (editingWidget) {
      const result = await updateWidget(widget);
      if (result.success) {
        setSnackbar({ open: true, message: 'Widget atualizado com sucesso!' });
      } else {
        setSnackbar({ open: true, message: `Erro: ${result.error}` });
      }
    } else {
      const result = await addWidget(widget);
      if (result.success) {
        setSnackbar({ open: true, message: 'Widget criado com sucesso!' });
      } else {
        setSnackbar({ open: true, message: `Erro: ${result.error}` });
      }
    }
    setEditingWidget(null);
  };

  const handleEdit = (widget: Widget) => {
    setEditingWidget(widget);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este widget?')) {
      const result = await deleteWidget(id);
      if (result.success) {
        setSnackbar({ open: true, message: 'Widget excluído com sucesso!' });
      } else {
        setSnackbar({ open: true, message: `Erro: ${result.error}` });
      }
    }
  };

  const handleOpenDialog = () => {
    setEditingWidget(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingWidget(null);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSegmentFilter('all');
  };

  const handleViewDetails = (widget: Widget) => {
    setViewingWidget(widget);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setViewingWidget(null);
  };

  const handleEditFromDetail = (widget: Widget) => {
    setEditingWidget(widget);
    setDialogOpen(true);
  };

  // Handlers para Melhorias
  const handleSaveImprovement = async (improvement: Improvement) => {
    if (editingImprovement) {
      const result = await updateImprovement(improvement);
      if (result.success) {
        setSnackbar({ open: true, message: 'Melhoria atualizada com sucesso!' });
      } else {
        setSnackbar({ open: true, message: `Erro: ${result.error}` });
      }
    } else {
      const result = await addImprovement(improvement);
      if (result.success) {
        setSnackbar({ open: true, message: 'Melhoria criada com sucesso!' });
      } else {
        setSnackbar({ open: true, message: `Erro: ${result.error}` });
      }
    }
    setEditingImprovement(null);
    setNewImprovementStatus(null);
  };

  const handleEditImprovement = (improvement: Improvement) => {
    setEditingImprovement(improvement);
    setNewImprovementStatus(null);
    setImprovementDialogOpen(true);
  };

  const handleDeleteImprovement = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta melhoria?')) {
      const result = await deleteImprovement(id);
      if (result.success) {
        setSnackbar({ open: true, message: 'Melhoria excluída com sucesso!' });
      } else {
        setSnackbar({ open: true, message: `Erro: ${result.error}` });
      }
    }
  };

  const handleAddNewImprovement = (status: Improvement['status']) => {
    setEditingImprovement(null);
    setNewImprovementStatus(status);
    setImprovementDialogOpen(true);
  };

  const handleCloseImprovementDialog = () => {
    setImprovementDialogOpen(false);
    setEditingImprovement(null);
    setNewImprovementStatus(null);
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f0f0f0',
        py: 3,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            p: 3,
            bgcolor: '#003D7A',
            borderRadius: 2,
            color: 'white',
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Controle de Widgets
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Sistema de gerenciamento e acompanhamento de widgets
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              startIcon={<RefreshCw size={16} />}
              onClick={() => {
                refreshWidgets();
                refreshImprovements();
              }}
              sx={{
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Atualizar
            </Button>
            {activeTab === 0 && (
              <Button
                variant="contained"
                startIcon={<Plus size={20} />}
                onClick={handleOpenDialog}
                sx={{
                  bgcolor: '#FFED00',
                  color: '#003D7A',
                  '&:hover': { bgcolor: '#e6d500' },
                  fontWeight: 600,
                }}
              >
                Novo Widget
              </Button>
            )}
          </Box>
        </Box>

        {/* Mensagens de erro */}
        {(widgetsError || improvementsError) && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {widgetsError || improvementsError}
            {' - Usando dados locais como fallback'}
          </Alert>
        )}

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
              },
              '& .Mui-selected': {
                color: '#003D7A',
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#FFED00',
                height: 3,
              },
            }}
          >
            <Tab key="widgets" label="Widgets" icon={<Plus size={18} />} iconPosition="start" />
            <Tab key="melhorias" label="Melhorias" icon={<Kanban size={18} />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Loading indicator */}
        {(widgetsLoading || improvementsLoading) && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Conteúdo da Tab de Widgets */}
        {activeTab === 0 && !widgetsLoading && (
          <>
            {/* Estatísticas */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
              }}
            >
              <Paper sx={{ p: 2, flex: 1, minWidth: 200 }}>
                <Typography variant="body2" color="text.secondary">
                  Total de Widgets
                </Typography>
                <Typography variant="h4" sx={{ color: '#003D7A', fontWeight: 600 }}>
                  {widgets.length}
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, flex: 1, minWidth: 200 }}>
                <Typography variant="body2" color="text.secondary">
                  OK ✅
                </Typography>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 600 }}>
                  {widgets.filter((w) => w.status === 'ok').length}
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, flex: 1, minWidth: 200 }}>
                <Typography variant="body2" color="text.secondary">
                  A Verificar 🟡
                </Typography>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 600 }}>
                  {widgets.filter((w) => w.status === 'verify').length}
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, flex: 1, minWidth: 200 }}>
                <Typography variant="body2" color="text.secondary">
                  Com Problema ❌
                </Typography>
                <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 600 }}>
                  {widgets.filter((w) => w.status === 'problem').length}
                </Typography>
              </Paper>
            </Box>

            {/* Filtros */}
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              segmentFilter={segmentFilter}
              onSegmentFilterChange={setSegmentFilter}
              onClearFilters={handleClearFilters}
            />

            {/* Tabela */}
            <Box sx={{ mt: 3 }}>
              {filteredWidgets.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    Nenhum widget encontrado
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Tente ajustar os filtros ou adicione um novo widget
                  </Typography>
                </Paper>
              ) : (
                <WidgetTable
                  widgets={filteredWidgets}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewDetails={handleViewDetails}
                />
              )}
            </Box>
          </>
        )}

        {/* Conteúdo da Tab de Melhorias (Kanban) */}
        {activeTab === 1 && !improvementsLoading && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#003D7A', fontWeight: 600 }}>
                Quadro de Melhorias
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gerencie as melhorias planejadas para o sistema de widgets
              </Typography>
            </Box>
            <KanbanBoard
              improvements={improvements}
              onEdit={handleEditImprovement}
              onDelete={handleDeleteImprovement}
              onAddNew={handleAddNewImprovement}
            />
          </>
        )}

        {/* Dialog de Criação/Edição */}
        <WidgetDialog
          open={dialogOpen}
          widget={editingWidget}
          onClose={handleCloseDialog}
          onSave={handleSave}
        />

        {/* Dialog de Detalhes */}
        <WidgetDetailDialog
          open={detailDialogOpen}
          widget={viewingWidget}
          onClose={handleCloseDetailDialog}
          onEdit={handleEditFromDetail}
        />

        {/* Dialog de Melhorias */}
        <ImprovementDialog
          open={improvementDialogOpen}
          improvement={editingImprovement || (newImprovementStatus ? { status: newImprovementStatus } as Improvement : null)}
          onClose={handleCloseImprovementDialog}
          onSave={handleSaveImprovement}
        />

        {/* Snackbar de Feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Container>
    </Box>
  );
}
