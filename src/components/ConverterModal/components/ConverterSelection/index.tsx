import React from 'react';

import { currencies } from '@/constants/currencies';

import styles from './styles.module.scss';

interface ConverterSelectionProps {
  selectToCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  fromCurrency: string;
}

export const ConverterSelection = ({ selectToCurrency, fromCurrency }: ConverterSelectionProps) => {
  const avaibleCurrencies = currencies.filter((currency) => currency !== fromCurrency);
  return (
    <div className={styles.converterSelectionContainer}>
      <p className={styles.accentText}>{fromCurrency}</p>
      <p>to</p>
      <select name="currencySelection" onChange={selectToCurrency} defaultValue={1}>
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
