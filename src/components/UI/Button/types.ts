import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}
