import React, { useState } from 'react';
import { Box, Paper, Typography, Dialog, Button, Select, MenuItem, Chip } from '@mui/material';
import useStore, { Cage } from '../store';

const STATUS_OPTIONS = [
  { label: '配对中', color: 'primary' },
  { label: '隔离中', color: 'secondary' },
  { label: '待鉴定', color: 'warning' },
  { label: '已怀孕', color: 'success' },
  { label: '临产', color: 'error' },
];

const CageGrid: React.FC = () => {
  const cages = useStore(state => state.cages);
  const selectedRackId = useStore(state => state.selectedRackId);
  const addCage = useStore(state => state.addCage);
  const updateCage = useStore(state => state.updateCage);
  const setSelectedCage = useStore(state => state.setSelectedCage);
  const moveMouse = useStore(state => state.moveMouse);
  const selectedCageId = useStore(state => state.selectedCageId);
  const { rows, cols } = useStore(state => state.gridConfig);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Cage | null>(null);
  const [status, setStatus] = useState('');

  const handleCellClick = (row: number, col: number) => {
    const cage = cages.find(
      c => c.rackId === selectedRackId && c.position.row === row && c.position.col === col
    );
    setSelectedCage(cage ? cage.id : undefined);
  };

  const handleCellDoubleClick = (row: number, col: number) => {
    const cage = cages.find(
      c => c.rackId === selectedRackId && c.position.row === row && c.position.col === col
    );
    if (cage) {
      setEditing(cage);
      setStatus(cage.status);
    } else {
      setEditing({ id: `C${row}${col}`, rackId: selectedRackId, position: { row, col }, status: '', mice: [] });
      setStatus('');
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!editing) return;
    const newCage = { ...editing, status };
    if (cages.some(c => c.id === editing.id)) {
      updateCage(newCage);
    } else {
      addCage(newCage);
    }
    setOpen(false);
  };

  const renderCell = (row: number, col: number) => {
    const cage = cages.find(
      c => c.rackId === selectedRackId && c.position.row === row && c.position.col === col
    );
    return (
      <Paper
        variant="outlined"
        key={`${row}-${col}`}
        onClick={() => handleCellClick(row, col)}
        onDoubleClick={() => handleCellDoubleClick(row, col)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          const mouseId = e.dataTransfer.getData('text/plain');
          if (mouseId) moveMouse(mouseId, cage ? cage.id : `C${row}${col}`);
          setSelectedCage(cage ? cage.id : `C${row}${col}`);
        }}
        sx={{
          height: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: selectedCageId === (cage ? cage.id : `C${row}${col}`)
            ? '2px solid #1976d2'
            : '1px solid #ccc',
        }}
      >
        <Typography>{cage ? cage.id : `空(${row},${col})`}</Typography>
        {cage?.status && (
          <Chip label={cage.status} color={STATUS_OPTIONS.find(o => o.label === cage.status)?.color as any} size="small" sx={{ mt: 0.5 }} />
        )}
      </Paper>
    );
  };

  return (
    <Box sx={{ border: 1, p: 1 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 2,
        }}
      >
        {Array.from({ length: rows }).map((_, rowIdx) =>
          Array.from({ length: cols }).map((_, colIdx) => renderCell(rowIdx + 1, colIdx + 1))
        )}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>编辑笼位</Typography>
          <Select
            fullWidth
            value={status}
            onChange={e => setStatus(e.target.value as string)}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">无</MenuItem>
            {STATUS_OPTIONS.map(opt => (
              <MenuItem key={opt.label} value={opt.label}>{opt.label}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>保存</Button>
          <Button onClick={() => setOpen(false)}>取消</Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CageGrid;
