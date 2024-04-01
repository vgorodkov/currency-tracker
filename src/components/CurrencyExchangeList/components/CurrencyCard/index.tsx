import React, { memo } from 'react';

import { CurrencyInfo } from '@/types';
import { formatRate } from '@/utils/formatRate';
import { icons } from '@/utils/mapIcons';

import styles from './styles.module.scss';

interface CurrencyCardProps {
  onCurrencyCardClick: (currencyInfo: CurrencyInfo) => void;
  rate: number;
  assetId: string;
  assetName: string;
}

export const CurrencyCard = memo(
  ({ rate, assetId, onCurrencyCardClick, assetName }: CurrencyCardProps) => {
    const handleCurrencyCardClick = () => {
      onCurrencyCardClick({ rate, asset_id: assetId });
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
  }
);
