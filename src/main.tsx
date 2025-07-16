import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import App from './App';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Root = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({ toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')) }),
    [],
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode, primary: { main: '#4cc9cc' } },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
