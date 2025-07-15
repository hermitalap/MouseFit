import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Dialog, TextField, Button } from '@mui/material';
import useStore, { Cage } from '../store';

const gridSize = 3; // 3x3 grid demo

const CageGrid: React.FC = () => {
  const cages = useStore(state => state.cages);
  const addCage = useStore(state => state.addCage);
  const updateCage = useStore(state => state.updateCage);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Cage | null>(null);
  const [status, setStatus] = useState('');

  const handleCellClick = (row: number, col: number) => {
    const cage = cages.find(c => c.position.row === row && c.position.col === col);
    if (cage) {
      setEditing(cage);
      setStatus(cage.status);
    } else {
      setEditing({ id: `C${row}${col}`, position: { row, col }, status: '', mice: [] });
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
    const cage = cages.find(c => c.position.row === row && c.position.col === col);
    return (
      <Grid item xs={4} key={`${row}-${col}`}> 
        <Paper
          onClick={() => handleCellClick(row, col)}
          sx={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <Typography>{cage ? cage.id : '空'}</Typography>
        </Paper>
      </Grid>
    );
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {Array.from({ length: gridSize }).map((_, rowIdx) =>
          Array.from({ length: gridSize }).map((_, colIdx) => renderCell(rowIdx + 1, colIdx + 1))
        )}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>编辑笼位</Typography>
          <TextField
            label="状态"
            fullWidth
            margin="normal"
            value={status}
            onChange={e => setStatus(e.target.value)}
          />
          <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>保存</Button>
          <Button onClick={() => setOpen(false)}>取消</Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CageGrid;
