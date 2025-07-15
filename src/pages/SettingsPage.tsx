import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Layout from '../components/Layout';
import useStore from '../store';

const SettingsPage: React.FC = () => {
  const { rows, cols } = useStore(state => state.gridConfig);
  const setGridConfig = useStore(state => state.setGridConfig);

  const [r, setR] = useState(rows);
  const [c, setC] = useState(cols);

  const handleSave = () => {
    setGridConfig(r, c);
  };

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>笼架设置</Typography>
      <TextField
        label="行数"
        type="number"
        value={r}
        onChange={e => setR(Number(e.target.value))}
        sx={{ mr: 2, width: 100 }}
      />
      <TextField
        label="列数"
        type="number"
        value={c}
        onChange={e => setC(Number(e.target.value))}
        sx={{ mr: 2, width: 100 }}
      />
      <Button variant="contained" onClick={handleSave}>保存</Button>
    </Layout>
  );
};

export default SettingsPage;
