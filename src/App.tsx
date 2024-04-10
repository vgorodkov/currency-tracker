import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingFallback } from '@/components/UI/LoadingFallback';
import { useInitTheme } from '@/hooks/useInitTheme';
import { AppRouter } from '@/routers/AppRouter';
import { persistor, store } from '@/store';

export const App = () => {
  useInitTheme();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<LoadingFallback />}>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};
