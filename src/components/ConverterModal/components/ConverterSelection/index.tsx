import React from 'react';
import { useSelector } from 'react-redux';

import { currencies } from '@/constants/currencies';
import { setToCurrency } from '@/redux/slices/converterSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import styles from './styles.module.scss';

export const ConverterSelection = () => {
  const dispatch = useAppDispatch();

  const fromCurrencyCode = useSelector((state: RootState) => state.converter.fromCurrency.code);
  const avaibleCurrencies = currencies.filter((currency) => currency !== fromCurrencyCode);

  const selectToCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setToCurrency(e.target.value));
  };

  return (
    <div className={styles.converterSelectionContainer}>
      <p className={styles.accentText}>{fromCurrencyCode}</p>
      <p>to</p>
      <select name="currencySelection" onChange={selectToCurrency}>
        <option value="">Select currency</option>
        {avaibleCurrencies.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
