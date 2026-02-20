// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily:'"Roboto Serif", serif',

    body1: {
      fontSize: '0.95rem',
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    h4: {
      fontSize: '1.8rem',
    },
    h5: {
      fontSize: '1.4rem',
    },
  },

  font: {
    title: '45px',
    heading: '32px',
    paragraph: '16px',
    button: '12px',
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#c60800',
      secondary: '#c60800',
    },
    secondary: {
      main: '#c60800',
    },
    background: {
      default: '#f8f8f8',
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export default theme;