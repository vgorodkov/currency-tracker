import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoadingFallback } from '@/components/LoadingFallback';
import { MainLayout } from '@/components/MainLayout';
import { RoutePath } from '@/constants/routes';
import { THEME_DATA_ATTR, THEME_KEY, ThemeVariant } from '@/constants/theme';
import { LazyBankCard, LazyContacts, LazyHome, LazyTimeline } from '@/pages';

export const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem(THEME_KEY) || ThemeVariant.LIGHT;
    document.documentElement.setAttribute(THEME_DATA_ATTR, theme);
  }, []);

  return (
    <Routes>
      <Route path={RoutePath.HOME} element={<MainLayout />}>
        <Route
          index
          path={RoutePath.HOME}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path={RoutePath.TIMELINE}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LazyTimeline />
            </Suspense>
          }
        />
        <Route
          path={RoutePath.BANKCARD}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LazyBankCard />
            </Suspense>
          }
        />
        <Route
          path={RoutePath.CONTACTS}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LazyContacts />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
