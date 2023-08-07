import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store.ts';
import { ThemeProvider } from './context/ThemeContext';
import { ModalDetailsProvider } from './context/ModalDetailsContext';
import { ModalStatisticsProvider } from './context/ModalStatisticsContext';
import { LettersProvider } from './context/LettersContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <ModalDetailsProvider>
            <ModalStatisticsProvider>
              <LettersProvider>
                <App />
              </LettersProvider>
            </ModalStatisticsProvider>
          </ModalDetailsProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
