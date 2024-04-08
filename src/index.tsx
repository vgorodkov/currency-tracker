import './global.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from '@/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { persistor, store } from '@/redux/store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('rootElement not found');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
