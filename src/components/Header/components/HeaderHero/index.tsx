import Logo from '@/assets/icons/logo.svg';
import styles from './styles.module.scss';

export function HeaderHero() {
  return (
    <div className={styles.headerHeroContainer}>
      <div className={styles.headerHeroText}>
        <h2>Modsen Currency</h2>
        <h1>Tracker</h1>
        <h4>
          Quotes for the dollar and other <br /> international currencies.
        </h4>
      </div>
      <div className={styles.headerHero}>
        <Logo className={styles.heroLogo} />
      </div>
    </div>
  );
}
