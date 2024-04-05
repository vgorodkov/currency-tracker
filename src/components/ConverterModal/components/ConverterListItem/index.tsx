import { icons } from '@/constants/icons';
import { ConverterCurrency } from '@/types';
import { formatRate } from '@/utils/formatRate';

import styles from './styles.module.scss';

interface CurrencyItemProps {
  iconPath: string;
  name: string;
}

const CurrencyItem = ({ iconPath, name }: CurrencyItemProps) => {
  return (
    <div className={styles.currencyContainer}>
      <img className={styles.currencyIcon} src={iconPath} alt="currency icon" />
      <p>{name}</p>
    </div>
  );
};

export const ConverterListItem = ({ fromCurrency, toCurrency, rate }: ConverterCurrency) => {
  return (
    <li className={styles.converterItem}>
      <div className={styles.fromToContainer}>
        <CurrencyItem iconPath={icons[fromCurrency]} name={fromCurrency} />
        <p>&#8594;</p>
        <CurrencyItem iconPath={icons[toCurrency]} name={toCurrency} />
      </div>
      <p>{formatRate(rate)}</p>
    </li>
  );
};
