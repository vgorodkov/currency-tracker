import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

import { ConverterCurrencyRow } from '../ConverterCurrencyRow';
import styles from './styles.module.scss';

export const ConverterCurrencies = () => {
  const fromCurrency = useSelector((state: RootState) => state.converter.fromCurrency);
  const toCurrency = useSelector((state: RootState) => state.converter.toCurrency);
  return (
    <div className={styles.converterCurrencies}>
      <ConverterCurrencyRow
        fromCurrency={fromCurrency.code}
        toCurrency="USD"
        rate={fromCurrency.rate}
      />
      <ConverterCurrencyRow
        fromCurrency={fromCurrency.code}
        toCurrency={toCurrency.code}
        rate={toCurrency.rate}
        isConvertedCurrency
      />
    </div>
  );
};
