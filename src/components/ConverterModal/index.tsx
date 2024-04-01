import { useEffect, useMemo, useState } from 'react';

import { convertCurrency } from '@/api/convertCurrency';
import { ConverterCurrency, CurrencyInfo } from '@/types';

import { ConverterList } from './components/ConverterList';
import { ConverterSelection } from './components/ConverterSelection';
import styles from './styles.module.scss';

interface ConverterModalProps {
  fromCurrencyInfo: CurrencyInfo;
}

export const ConverterModal = ({ fromCurrencyInfo }: ConverterModalProps) => {
  const { asset_id: fromCurrency, rate: fromRate } = fromCurrencyInfo;
  const inititalConverterListItem: ConverterCurrency = useMemo(() => {
    return {
      fromCurrency,
      rate: fromRate,
      toCurrency: 'USD',
    };
  }, [fromCurrency, fromRate]);

  const [converterListItems, setConverterListItems] = useState<ConverterCurrency[]>([
    inititalConverterListItem,
  ]);
  const [toCurrency, setToCurrency] = useState<string>('');
  const [isConvertBtnDisabled, setIsConvertBtnDisabled] = useState(true);

  const addToConverterList = (newCurrencyPair: ConverterCurrency) => {
    setConverterListItems([...converterListItems, newCurrencyPair]);
  };

  const selectToCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetToCurrency = e.target.value;
    const isAlreadyInList = converterListItems.some((item) => item.toCurrency === targetToCurrency);

    if (isAlreadyInList) {
      setIsConvertBtnDisabled(true);
      return;
    }

    setIsConvertBtnDisabled(false);
    setToCurrency(targetToCurrency);
  };

  const onConverterBtnClick = async () => {
    const converted = await convertCurrency(fromCurrency, toCurrency);
    const newCurrencyPair = {
      fromCurrency: converted.asset_id_base,
      toCurrency: converted.asset_id_quote,
      rate: converted.rate,
    };

    addToConverterList(newCurrencyPair);
    setIsConvertBtnDisabled(true);
  };

  useEffect(() => {
    setConverterListItems([inititalConverterListItem]);
  }, [fromCurrency, inititalConverterListItem]);

  return (
    <div className={styles.converterModal}>
      <h3 className={styles.modalTitle}>Exchange Rate</h3>
      <ConverterList converterListItems={converterListItems} />
      <ConverterSelection fromCurrency={fromCurrency} selectToCurrency={selectToCurrency} />
      <button
        disabled={isConvertBtnDisabled || toCurrency === ''}
        type="button"
        onClick={onConverterBtnClick}
        className={styles.convertBtn}
      >
        Convert
      </button>
    </div>
  );
};
