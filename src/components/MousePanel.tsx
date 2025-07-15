import React from 'react';
import { Box, Typography } from '@mui/material';
import useStore from '../store';
import MouseCard from './MouseCard';

const MousePanel: React.FC = () => {
  const cages = useStore(state => state.cages);
  const mice = useStore(state => state.mice);
  const selectedCageId = useStore(state => state.selectedCageId);

  const cage = cages.find(c => c.id === selectedCageId);
  const list = cage ? cage.mice.map(id => mice.find(m => m.id === id)).filter(Boolean) : [];

  if (!cage) {
    return <Typography color="text.secondary">请选择笼位查看小鼠信息</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', p: 1 }}>
      {list.map(mouse => (
        <MouseCard key={mouse!.id} mouse={mouse!} />
      ))}
    </Box>
  );
};

export default MousePanel;
