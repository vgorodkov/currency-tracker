import styles from './styles.module.scss';

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
};
