import { useSelector } from 'react-redux';

import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { currencies } from '@/constants/currencies';
import { convertCurrency, setToCurrency } from '@/redux/slices/converterSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import styles from './styles.module.scss';

export const ConverterFooter = () => {
  const dispatch = useAppDispatch();

  const toCurrencyCode = useSelector((state: RootState) => state.converter.toCurrency);
  const fromCurrencyCode = useSelector((state: RootState) => state.converter.fromCurrency.code);
  const isLoading = useSelector((state: RootState) => state.converter.isLoading);

  const isBtnDisabled = !toCurrencyCode || isLoading;
  const avaibleCurrencies = currencies.filter((currency) => currency !== fromCurrencyCode);

  const onConverterBtnClick = () => {
    dispatch(convertCurrency());
  };

  const selectToCurrency = (toCurrency: string) => {
    dispatch(setToCurrency(toCurrency));
  };

  return (
    <div className={styles.converterFooter}>
      <Button title="Convert" onClick={onConverterBtnClick} disabled={isBtnDisabled} />
      <Dropdown
        options={avaibleCurrencies}
        selected={toCurrencyCode}
        handleSelect={selectToCurrency}
        pos="above"
      />
    </div>
  );
};
