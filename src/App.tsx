import { useInitTheme } from '@/hooks/useInitTheme';
import { AppRouter } from '@/routers/AppRouter';

export const App = () => {
  useInitTheme();

  return <AppRouter />;
};
