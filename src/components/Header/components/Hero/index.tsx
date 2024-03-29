import Logo from '@/assets/icons/logo.svg';
import styles from './styles.module.scss';

export function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h2>Modsen Currency</h2>
        <h1>Tracker</h1>
        <h4>
          Quotes for the dollar and other <br /> international currencies.
        </h4>
      </div>
      <Logo className={styles.heroLogo} />
    </div>
  );
}
