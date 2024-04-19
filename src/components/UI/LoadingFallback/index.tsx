import { LoaderSpinner } from '@/components/UI/LoaderSpinner';

import styles from './styles.module.scss';

export const LoadingFallback = () => {
  return (
    <div data-test="loading-fallback" className={styles.container}>
      <p className={styles.loadingMsg}>Loading...</p>
      <LoaderSpinner />
    </div>
  );
};
