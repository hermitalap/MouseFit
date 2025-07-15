import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);
  const user = useStore(state => state.user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            MouseFit
          </Typography>
          {user && (
            <>
              <Button color="inherit" component={Link} to="/">笼位管理</Button>
              <Button color="inherit" component={Link} to="/settings">设置</Button>
              <Button color="inherit" onClick={handleLogout}>退出</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;
