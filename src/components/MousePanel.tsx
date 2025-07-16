import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import useStore from '../store';
import MouseCard from './MouseCard';

const MousePanel: React.FC = () => {
  const cages = useStore(state => state.cages);
  const mice = useStore(state => state.mice);
  const selectedCageId = useStore(state => state.selectedCageId);
  const addMouse = useStore(state => state.addMouse);
  const moveMouse = useStore(state => state.moveMouse);

  const cage = cages.find(c => c.id === selectedCageId);
  const list = cage ? cage.mice.map(id => mice.find(m => m.id === id)).filter(Boolean) : [];

  if (!cage) {
    return <Typography color="text.secondary">请选择笼位查看小鼠信息</Typography>;
  }

  const handleAdd = () => {
    if (!selectedCageId) return;
    const id = `M${Date.now()}`;
    const newMouse = {
      id,
      earTag: '',
      strain: '',
      gender: 'M' as const,
      birthDate: '',
      parents: { father: '', mother: '' },
      genotypeStatus: '',
      notes: '',
    };
    addMouse(newMouse);
    moveMouse(id, selectedCageId);
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', p: 1, border: 1 }}>
      {list.map(mouse => (
        <MouseCard key={mouse!.id} mouse={mouse!} />
      ))}
      <Card
        variant="outlined"
        onClick={handleAdd}
        sx={{
          minWidth: 200,
          mr: 2,
          border: '2px dashed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Typography color="text.secondary">添加小鼠</Typography>
      </Card>
    </Box>
  );
};

export default MousePanel;
