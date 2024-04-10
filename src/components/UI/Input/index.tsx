import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const Input = ({ placeholder, ...props }: InputProps) => {
  return <input className={styles.inputField} type="text" placeholder={placeholder} {...props} />;
};
