import { Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/components/MainLayout';
import { RoutePath } from '@/constants/routes';
import { LazyBankCard, LazyContacts, LazyHome, LazyTimeline } from '@/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePath.HOME} element={<MainLayout />}>
        <Route index path={RoutePath.HOME} element={<LazyHome />} />
        <Route path={RoutePath.TIMELINE} element={<LazyTimeline />} />
        <Route path={RoutePath.BANKCARD} element={<LazyBankCard />} />
        <Route path={RoutePath.CONTACTS} element={<LazyContacts />} />
      </Route>
    </Routes>
  );
};
