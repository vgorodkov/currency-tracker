import { ConverterCurrency } from '@/types';
import { formatRate } from '@/utils/formatRate';

import styles from './styles.module.scss';

export const ConverterListItem = ({ fromCurrency, toCurrency, rate }: ConverterCurrency) => {
  return (
    <li className={styles.converterItem}>
      <p>
        {fromCurrency} to {toCurrency}
      </p>
      <p>{formatRate(rate)}</p>
    </li>
  );
};
