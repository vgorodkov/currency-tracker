import styles from './styles.module.scss';
import { ButtonProps } from './types';

export const Button = ({ title, onClick, disabled = false, ...props }: ButtonProps) => {
  const handleBtnClick = () => {
    onClick();
  };

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={handleBtnClick}
      className={styles.button}
      {...props}
    >
      {title}
    </button>
  );
};
