import styles from './styles.module.scss';
import { HeaderHero } from '@/components/Header/components/HeaderHero';
import { HeaderNav } from '@/components/Header/components/HeaderNav';

export function Header() {
  return (
    <header className={styles.header}>
      <HeaderNav />
      <HeaderHero />
    </header>
  );
}
