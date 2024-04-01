import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoadingFallback } from '@/components/LoadingFallback';
import { MainLayout } from '@/components/MainLayout';
import { LazyBankCard, LazyContacts, LazyHome, LazyTimeline } from '@/pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/timeline"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LazyTimeline />
            </Suspense>
          }
        />
        <Route
          path="/bankcard"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LazyBankCard />
            </Suspense>
          }
        />
        <Route
          path="/contacts"
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
