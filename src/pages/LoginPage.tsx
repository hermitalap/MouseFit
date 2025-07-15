import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useStore(state => state.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>登录</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="用户名"
          fullWidth
          margin="normal"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="密码"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">{error}</Typography>
        )}
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          登录
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
