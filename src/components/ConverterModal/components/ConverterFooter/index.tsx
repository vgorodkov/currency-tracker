import { useSelector } from 'react-redux';

import { Button, Dropdown } from '@/components/UI';
import { currencies } from '@/constants/currencies';
import { useAppDispatch } from '@/store/hooks';
import { setToCurrencyCode, setToCurrencyRate } from '@/store/slices/converterSlice';
import {
  convertedListSelector,
  fromCurrencySelector,
  isConverterLoadingSelector,
  toCurrencySelector,
} from '@/store/slices/converterSlice/converterSelectors';
import { convertCurrency } from '@/store/slices/converterSlice/converterThunk';
import { getTodayDate } from '@/utils/getTodayDate';

import styles from './styles.module.scss';

export const ConverterFooter = () => {
  const dispatch = useAppDispatch();

  const convertedList = useSelector(convertedListSelector);
  const toCurrency = useSelector(toCurrencySelector);
  const fromCurrencyCode = useSelector(fromCurrencySelector).code;
  const isLoading = useSelector(isConverterLoadingSelector);

  const isBtnDisabled = !toCurrency || isLoading;
  const avaibleCurrencies = currencies.filter((currency) => currency !== fromCurrencyCode);

  const onConverterBtnClick = () => {
    const convertedItem = convertedList.find(
      (item) => item.code === `${fromCurrencyCode}-${toCurrency.code}`
    );
    if (convertedItem) {
      if (convertedItem.cachedDate <= getTodayDate()) {
        dispatch(setToCurrencyRate(convertedItem.rate));
        return;
      }
    }

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
      <Button
        data-test="convert-btn"
        title="Convert"
        onClick={onConverterBtnClick}
        disabled={isBtnDisabled}
      />
      <Dropdown
        data-test="converter-dropdown"
        options={avaibleCurrencies}
        selected={toCurrency.code}
        handleSelect={selectToCurrencyCode}
        pos="above"
      />
    </div>
  );
};
