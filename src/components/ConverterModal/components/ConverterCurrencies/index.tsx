import { useSelector } from 'react-redux';

import { BASE_CURRENCY } from '@/constants/currencies';
import {
  fromCurrencySelector,
  toCurrencySelector,
} from '@/store/slices/converterSlice/converterSelectors';

import { ConverterCurrencyRow } from '../ConverterCurrencyRow';
import styles from './styles.module.scss';

export const ConverterCurrencies = () => {
  const fromCurrency = useSelector(fromCurrencySelector);
  const toCurrency = useSelector(toCurrencySelector);
  return (
    <div className={styles.converterCurrencies}>
      <ConverterCurrencyRow
        fromCurrency={fromCurrency.code}
        toCurrency={BASE_CURRENCY}
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
