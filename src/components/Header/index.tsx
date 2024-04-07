import { Hero } from '@/components/Header/components/Hero';
import { NavBar } from '@/components/Header/components/NavBar';

import { LastUpdated } from './components/LastUpdated';

export const Header = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <LastUpdated />
    </>
  );
};
