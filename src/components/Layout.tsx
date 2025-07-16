import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store';
import { ColorModeContext } from '../main';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);
  const user = useStore(state => state.user);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

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
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;
