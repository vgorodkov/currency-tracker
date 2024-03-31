import { useEffect, useState } from 'react';

import { convertCurrency } from '@/api/convertCurrency';
import { ConverterCurrency, CurrencyInfo } from '@/types';

import { ConverterList } from './components/ConverterList';
import { ConverterSelection } from './components/ConverterSelection';
import styles from './styles.module.scss';

interface ConverterModalProps {
  fromCurrencyInfo: CurrencyInfo;
}

export const ConverterModal = ({ fromCurrencyInfo }: ConverterModalProps) => {
  const { asset_id_quote: fromCurrency } = fromCurrencyInfo;

  const [converterListItems, setConverterListItems] = useState<ConverterCurrency[]>([]);
  const [toCurrency, setToCurrency] = useState<string>('');

  const addToConverterList = (newCurrencyPair: ConverterCurrency) => {
    const isAlreadyInList = converterListItems.some(
      (item) => item.toCurrency === newCurrencyPair.toCurrency
    );
    if (isAlreadyInList) {
      return;
    }

    setConverterListItems([...converterListItems, newCurrencyPair]);
  };

  const selectToCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const onConverterBtnClick = async () => {
    const isToCurrencyNotSelected = toCurrency === '';
    if (isToCurrencyNotSelected) {
      return;
    }
    const converted = await convertCurrency(fromCurrency, toCurrency);
    const newCurrencyPair = {
      fromCurrency: converted.asset_id_base,
      toCurrency: converted.asset_id_quote,
      rate: converted.rate,
    };

    addToConverterList(newCurrencyPair);
  };

  useEffect(() => {
    setConverterListItems([]);
  }, [fromCurrency]);

  return (
    <div className={styles.converterModal}>
      <h3 className={styles.modalTitle}>Exchange Rate</h3>
      <ConverterList fromCurrencyInfo={fromCurrencyInfo} converterListItems={converterListItems} />
      <ConverterSelection fromCurrency={fromCurrency} selectToCurrency={selectToCurrency} />
      <button type="button" onClick={onConverterBtnClick}>
        Convert
      </button>
    </div>
  );
};
