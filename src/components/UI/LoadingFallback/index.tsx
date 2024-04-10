import { LoaderSpinner } from '@/components/UI/LoaderSpinner';

import styles from './styles.module.scss';

export const LoadingFallback = () => {
  return (
    <div className={styles.container}>
      <p className={styles.loadingMsg}>Loading...</p>
      <LoaderSpinner />
    </div>
  );
};
