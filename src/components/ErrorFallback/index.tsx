import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';
import { ErrorFallbackProps } from './types';

export const ErrorFallback = ({ errorInfo }: ErrorFallbackProps) => {
  return (
    <div className={styles.errorContainer}>
      <h1>An error occured</h1>
      <h4>{errorInfo.componentStack}</h4>
      <NavLink to="/">Go to Home Page</NavLink>
    </div>
  );
};
