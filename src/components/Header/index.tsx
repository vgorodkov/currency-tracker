import styles from './styles.module.scss';
import { HeaderNav } from '@/components/Header/components/HeaderNav';

export function Header() {
  return (
    <header className={styles.header}>
      <HeaderNav />
    </header>
  );
}
