import { useSelector } from 'react-redux';

import { convertCurrency } from '@/redux/slices/converterSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import styles from './styles.module.scss';

export const ConverterButton = () => {
  const dispatch = useAppDispatch();

  const toCurrencyCode = useSelector((state: RootState) => state.converter.toCurrency);

  const isNotSelected = toCurrencyCode === '';

  const onConverterBtnClick = () => {
    dispatch(convertCurrency());
  };
  return (
    <button
      disabled={isNotSelected}
      type="button"
      onClick={onConverterBtnClick}
      className={styles.convertBtn}
    >
      Convert
    </button>
  );
};
