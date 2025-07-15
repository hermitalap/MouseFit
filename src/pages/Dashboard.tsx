import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CageGrid from '../components/CageGrid';
import useStore from '../store';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useStore(state => state.user);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        笼位管理
      </Typography>
      <CageGrid />
    </Layout>
  );
};

export default Dashboard;
