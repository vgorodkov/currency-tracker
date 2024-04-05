import styles from './styles.module.scss';

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ title, onClick, disabled = false }: ButtonProps) => {
  return (
    <button disabled={disabled} type="button" onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
};
