/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './styles.module.scss';

export const ToggleThemeBtn = () => {
  return (
    <>
      <input className={styles.input} type="checkbox" id="darkmode-toggle" />
      <label className={styles.label} htmlFor="darkmode-toggle" />
    </>
  );
};
