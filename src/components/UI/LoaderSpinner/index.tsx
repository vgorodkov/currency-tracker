import styles from './styles.module.scss';

export const LoaderSpinner = () => {
  return <div data-test="loader-spinner" className={styles.loader} />;
};
