import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LoadingFallback } from '@/components/LoadingFallback';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </>
  );
};
