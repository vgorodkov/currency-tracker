import React from 'react';

import { BASE_CURRENCY } from '@/constants/currencies';
import { icons } from '@/constants/icons';
import {
  openConverter,
  setConvertedCurrencies,
  setFromCurrency,
} from '@/redux/slices/converterSlice';
import { useAppDispatch } from '@/redux/store';
import { formatRate } from '@/utils/formatRate';

import styles from './styles.module.scss';

interface CurrencyCardProps {
  rate: number;
  assetId: string;
  assetName: string;
}

export const CurrencyCard = ({ rate, assetId, assetName }: CurrencyCardProps) => {
  const dispatch = useAppDispatch();

  const handleCurrencyCardClick = () => {
    dispatch(openConverter());
    dispatch(setFromCurrency({ code: assetId, rate }));
    dispatch(setConvertedCurrencies({ fromCurrency: assetId, rate, toCurrency: BASE_CURRENCY }));
  };

  const onCurrencyCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      handleCurrencyCardClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={onCurrencyCardKeyDown}
      className={styles.cardContainer}
      onClick={handleCurrencyCardClick}
    >
      <img className={styles.icon} src={icons[assetId]} alt={assetId} />
      <div className={styles.infoContainer}>
        <p className={styles.currencyName}>{assetName}</p>
        <p className={styles.currencyValue}>$ {formatRate(rate)}</p>
      </div>
    </div>
  );
};
