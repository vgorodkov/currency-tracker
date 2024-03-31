import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

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
            <Suspense fallback="Loading...">
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/timeline"
          element={
            <Suspense fallback="Loading...">
              <LazyTimeline />
            </Suspense>
          }
        />
        <Route
          path="/bankcard"
          element={
            <Suspense fallback="Loading...">
              <LazyBankCard />
            </Suspense>
          }
        />
        <Route
          path="/contacts"
          element={
            <Suspense fallback="Loading...">
              <LazyContacts />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
