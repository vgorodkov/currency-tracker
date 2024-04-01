import { formatRate } from '@/utils/formatRate';

import styles from './styles.module.scss';

interface ConverterListItemProps {
  toCurrency: string;
  fromCurrency: string;
  rate: number;
}

export const ConverterListItem = ({ fromCurrency, toCurrency, rate }: ConverterListItemProps) => {
  return (
    <li className={styles.converterItem}>
      <p>
        {fromCurrency} to {toCurrency}
      </p>
      <p>{formatRate(rate)}</p>
    </li>
  );
};
