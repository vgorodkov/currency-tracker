import { useSelector } from 'react-redux';

import { LoaderSpinner } from '@/components/LoaderSpinner';
import { icons } from '@/constants/icons';
import { RootState } from '@/redux/store';
import { ConverterCurrency } from '@/types';
import { formatRate } from '@/utils/formatRate';

import { ConverterCurrencyItem } from '../ConverterCurrencyitem';
import styles from './styles.module.scss';

interface ConverterCurrencyRowProps extends ConverterCurrency {
  isConvertedCurrency?: boolean;
}

export const ConverterCurrencyRow = ({
  fromCurrency,
  toCurrency,
  rate,
  isConvertedCurrency = false,
}: ConverterCurrencyRowProps) => {
  const isLoading = useSelector((state: RootState) => state.converter.isLoading);

  const showLoader = isLoading && isConvertedCurrency;

  return (
    <li className={styles.converterCurrencyRow}>
      <div className={styles.fromToCurrencies}>
        <ConverterCurrencyItem iconPath={icons[fromCurrency]} name={fromCurrency} />
        <p>&#8594;</p>
        <ConverterCurrencyItem iconPath={icons[toCurrency]} name={toCurrency} />
      </div>
      <div className={styles.priceContainer}>
        {showLoader ? <LoaderSpinner /> : <p>{formatRate(rate)}</p>}
      </div>
    </li>
  );
};
