import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from '@/components/AppRouter';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingFallback } from '@/components/UI/LoadingFallback';
import { useInitTheme } from '@/hooks/useInitTheme';
import { useRevalidatePersistor } from '@/hooks/useRevalidatePersistor';
import { persistor, store } from '@/store';

export const App = () => {
  useInitTheme();
  useRevalidatePersistor();

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
