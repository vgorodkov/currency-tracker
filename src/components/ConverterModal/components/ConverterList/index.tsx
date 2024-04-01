import { ConverterCurrency } from '@/types';

import { ConverterListItem } from '../ConverterListItem';
import styles from './styles.module.scss';

interface ConverterListProps {
  converterListItems: ConverterCurrency[];
}

export const ConverterList = ({ converterListItems }: ConverterListProps) => {
  return (
    <ul className={styles.converterList}>
      {converterListItems.map((item) => (
        <ConverterListItem
          key={`${item.fromCurrency}-${item.toCurrency}`}
          fromCurrency={item.fromCurrency}
          rate={item.rate}
          toCurrency={item.toCurrency}
        />
      ))}
    </ul>
  );
};
