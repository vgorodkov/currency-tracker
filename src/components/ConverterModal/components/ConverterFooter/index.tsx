import { useSelector } from 'react-redux';

import { Button } from '@/components/UI/Button';
import { Dropdown } from '@/components/UI/Dropdown';
import { currencies } from '@/constants/currencies';
import {
  convertCurrency,
  setToCurrencyCode,
  setToCurrencyRate,
} from '@/redux/slices/converterSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import styles from './styles.module.scss';

export const ConverterFooter = () => {
  const dispatch = useAppDispatch();

  const toCurrency = useSelector((state: RootState) => state.converter.toCurrency);
  const fromCurrencyCode = useSelector((state: RootState) => state.converter.fromCurrency.code);
  const isLoading = useSelector((state: RootState) => state.converter.isLoading);

  const isBtnDisabled = !toCurrency || isLoading;
  const avaibleCurrencies = currencies.filter((currency) => currency !== fromCurrencyCode);

  const onConverterBtnClick = () => {
    dispatch(convertCurrency());
  };

  const selectToCurrencyCode = (targetToCurrency: string) => {
    if (targetToCurrency === toCurrency.code) {
      return;
    }
    dispatch(setToCurrencyRate(-1));
    dispatch(setToCurrencyCode(targetToCurrency));
  };

  return (
    <div className={styles.converterFooter}>
      <Button title="Convert" onClick={onConverterBtnClick} disabled={isBtnDisabled} />
      <Dropdown
        options={avaibleCurrencies}
        selected={toCurrency.code}
        handleSelect={selectToCurrencyCode}
        pos="above"
      />
    </div>
  );
};
