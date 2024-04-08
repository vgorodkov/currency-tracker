import styles from './styles.module.scss';

interface InputProps {
  placeholder: string;
}

export const Input = ({ placeholder }: InputProps) => {
  return <input className={styles.inputField} type="text" placeholder={placeholder} />;
};
