import styles from './styles.module.scss';
import { ButtonProps } from './types';

export const Button = ({ title, onClick, disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={styles.button}
      {...props}
    >
      {title}
    </button>
  );
};
