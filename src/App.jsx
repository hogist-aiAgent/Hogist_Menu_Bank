import React from 'react';
import MainRoutes from './routes/MainRoutes';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainRoutes/>
    </ThemeProvider>
    
  );
}

export default App;
