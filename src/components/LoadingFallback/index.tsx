import { LoaderSpinner } from '@/components/LoaderSpinner';

import styles from './styles.module.scss';

export const LoadingFallback = () => {
  return (
    <div className={styles.container}>
      <p className={styles.loadingMsg}>Loading...</p>
      <LoaderSpinner />
    </div>
  );
};
