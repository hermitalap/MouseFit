import React from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CageGrid from '../components/CageGrid';
import MousePanel from '../components/MousePanel';
import useStore from '../store';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const cages = useStore(state => state.cages);
  const selectedRackId = useStore(state => state.selectedRackId);
  const setSelectedRack = useStore(state => state.setSelectedRack);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        笼位管理
      </Typography>
      <Tabs
        value={selectedRackId}
        onChange={(_, v) => setSelectedRack(v)}
        sx={{ mb: 2 }}
      >
        {[...new Set(cages.map(c => c.rackId))].map(id => (
          <Tab key={id} value={id} label={id} />
        ))}
      </Tabs>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
        <Box sx={{ flex: 2, overflow: 'auto' }}>
          <CageGrid />
        </Box>
        <Box sx={{ flex: 1, mt: 2, overflow: 'hidden' }}>
          <MousePanel />
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
