import React, { memo } from 'react';

import {
  openConverter,
  setConvertedCurrencies,
  setFromCurrency,
  setToCurrency,
} from '@/redux/slices/converterSlice';
import { useAppDispatch } from '@/redux/store';
import { formatRate } from '@/utils/formatRate';
import { icons } from '@/utils/mapIcons';

import styles from './styles.module.scss';

interface CurrencyCardProps {
  rate: number;
  assetId: string;
  assetName: string;
}

export const CurrencyCard = memo(({ rate, assetId, assetName }: CurrencyCardProps) => {
  const dispatch = useAppDispatch();

  const handleCurrencyCardClick = () => {
    dispatch(openConverter());
    dispatch(setFromCurrency({ code: assetId, rate }));
    dispatch(setConvertedCurrencies({ fromCurrency: assetId, rate, toCurrency: 'USD' }));
    dispatch(setToCurrency(''));
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
      <img className={styles.icon} src={icons[assetId]} alt="" />
      <div className={styles.infoContainer}>
        <p className={styles.currencyName}>{assetName}</p>
        <p className={styles.currencyValue}>$ {formatRate(rate)}</p>
      </div>
    </div>
  );
});
