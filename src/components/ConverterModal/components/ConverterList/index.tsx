import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

import { ConverterListItem } from '../ConverterListItem';
import styles from './styles.module.scss';

export const ConverterList = () => {
  const fromCurrencyCode = useSelector((state: RootState) => state.converter.fromCurrency.code);
  const convertedCurrencies = useSelector(
    (state: RootState) => state.converter.convertedCurrencies
  );
  const listItems = convertedCurrencies.filter(
    (currency) => currency.fromCurrency === fromCurrencyCode
  );

  return (
    <ul className={styles.converterList}>
      {listItems.map((item) => (
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
