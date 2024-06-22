import { Button } from '@/components/UI';

import styles from './styles.module.scss';
import { ErrorFallbackProps } from './types';

export const ErrorFallback = ({ error, onBtnClick }: ErrorFallbackProps) => {
  return (
    <div data-test="error-fallback" className={styles.errorFallbackContainer}>
      <h1>{error}</h1>
      <Button onClick={onBtnClick} title="Retry" />
    </div>
  );
};
