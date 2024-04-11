import React, { useMemo } from 'react';

import { currencies, currenciesInfo } from '@/constants/currencies';
import { useAppDispatch } from '@/store/hooks';
import {
  openConverter,
  setFromCurrency,
  setToCurrencyCode,
  setToCurrencyRate,
} from '@/store/slices/converterSlice';
import { formatRate } from '@/utils/formatRate';

import styles from './styles.module.scss';
import { CurrencyCardProps } from './types';

export const CurrencyCard = ({ rate, assetId, assetName }: CurrencyCardProps) => {
  const dispatch = useAppDispatch();

  const avaibleCurrencies = useMemo(
    () => currencies.filter((currency) => currency !== assetId),
    [assetId]
  );

  const handleCurrencyCardClick = () => {
    dispatch(setToCurrencyCode(avaibleCurrencies[0]));
    dispatch(setToCurrencyRate(-1));
    dispatch(setFromCurrency({ code: assetId, rate }));
    dispatch(openConverter());
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
      <img className={styles.icon} src={currenciesInfo[assetId].img} alt={assetId} />
      <div className={styles.infoContainer}>
        <p className={styles.currencyName}>{assetName}</p>
        <p className={styles.currencyValue}>$ {formatRate(rate)}</p>
      </div>
    </div>
  );
};
