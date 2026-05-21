import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
} from '@mui/material';
import { Search, Filter, X } from 'lucide-react';
import { SEGMENT_OPTIONS, STATUS_OPTIONS } from '../types/widget';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  segmentFilter: string;
  onSegmentFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  segmentFilter,
  onSegmentFilterChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters = searchTerm || statusFilter !== 'all' || segmentFilter !== 'all';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        bgcolor: '#f5f5f5',
        borderRadius: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <TextField
        placeholder="Buscar por identifier ou nome..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{ minWidth: 300, flex: 1, bgcolor: 'white' }}
        InputProps={{
          startAdornment: <Search size={18} style={{ marginRight: 8, color: '#666' }} />,
        }}
      />
      <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'white' }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          {STATUS_OPTIONS.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'white' }}>
        <InputLabel>Segmento</InputLabel>
        <Select
          value={segmentFilter}
          label="Segmento"
          onChange={(e) => onSegmentFilterChange(e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          {SEGMENT_OPTIONS.map((segment) => (
            <MenuItem key={segment} value={segment}>
              {segment}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {hasActiveFilters && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<X size={16} />}
          onClick={onClearFilters}
          sx={{ borderColor: '#003D7A', color: '#003D7A' }}
        >
          Limpar Filtros
        </Button>
      )}
    </Box>
  );
}
