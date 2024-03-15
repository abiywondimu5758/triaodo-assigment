/* eslint-disable linebreak-style */
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { Router } from './Router';
import { theme } from './theme';
import { store } from './store/store';
import './global.css';
import NotificationComponent from './components/Notification';

export default function App() {
  return (
    <Provider store={store}>
    <MantineProvider theme={theme}>
      <Router />
      <NotificationComponent />
    </MantineProvider>
    </Provider>
  );
}
