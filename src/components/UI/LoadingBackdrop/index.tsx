import { LoaderSpinner } from '@/components/UI/LoaderSpinner';

import styles from './styles.module.scss';

export const LoadingBackdrop = () => {
  return (
    <div className={styles.loadingBackdrop}>
      <LoaderSpinner />
    </div>
  );
};
