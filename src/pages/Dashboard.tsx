import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CageGrid from '../components/CageGrid';
import useStore from '../store';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);
  const user = useStore(state => state.user);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        笼位管理
      </Typography>
      <Button variant="outlined" onClick={() => { logout(); navigate('/login'); }} sx={{ mb: 2 }}>
        退出登录
      </Button>
      <CageGrid />
    </Container>
  );
};

export default Dashboard;
