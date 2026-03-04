import React from 'react';
import MainRoutes from './routes/MainRoutes';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import WhatsAppButton from './components/WhatsapChatBot/WhatsAppButton';
import ChatAssistant from './components/WhatsapChatBot/ChatAssistant';
import ChatWidget from './components/WhatsapChatBot/ChatWidget';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainRoutes/>
      <WhatsAppButton/>
      <ChatAssistant/>
      <ChatWidget/>
    </ThemeProvider>
    
  );
}

export default App;
