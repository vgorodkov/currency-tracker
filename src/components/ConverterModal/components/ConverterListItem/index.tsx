import { formatRate } from '@/utils/formatRate';

import styles from './styles.module.scss';

interface ConverterListItemProps {
  toCurrency: string;
  fromCurrency: string;
  rate: number;
  flipRate: boolean;
}

export const ConverterListItem = ({
  fromCurrency,
  toCurrency,
  rate,
  flipRate = false,
}: ConverterListItemProps) => {
  return (
    <li className={styles.converterItem}>
      <p>
        {fromCurrency} to {toCurrency}
      </p>
      <p>{formatRate(rate, flipRate)}</p>
    </li>
  );
};
