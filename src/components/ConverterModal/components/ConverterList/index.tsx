import { ConverterCurrency, CurrencyInfo } from '@/types';

import { ConverterListItem } from '../ConverterListItem';
import styles from './styles.module.scss';

interface ConverterListProps {
  fromCurrencyInfo: CurrencyInfo;
  converterListItems: ConverterCurrency[];
}

export const ConverterList = ({ fromCurrencyInfo, converterListItems }: ConverterListProps) => {
  return (
    <ul className={styles.converterList}>
      <ConverterListItem
        fromCurrency={fromCurrencyInfo.asset_id_quote}
        rate={fromCurrencyInfo.rate}
        toCurrency="USD"
        flipRate
      />
      {converterListItems.map((item) => (
        <ConverterListItem
          key={`${item.fromCurrency}-${item.toCurrency}`}
          fromCurrency={item.fromCurrency}
          rate={item.rate}
          toCurrency={item.toCurrency}
          flipRate={false}
        />
      ))}
    </ul>
  );
};
