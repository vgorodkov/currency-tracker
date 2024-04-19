import logo from '@/assets/icons/logo.svg?url';

import styles from './styles.module.scss';

export const Hero = () => {
  return (
    <article className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h2>Modsen Currency</h2>
        <h1>Tracker</h1>
        <h4 className={styles.appDescription}>
          Quotes for the dollar and other <br /> international currencies.
        </h4>
      </div>
      <img title="company logo" src={logo} className={styles.heroLogo} alt="logo" />
    </article>
  );
};
