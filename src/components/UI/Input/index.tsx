import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: InputProps) => {
  return <input className={styles.inputField} type="text" {...props} />;
};
