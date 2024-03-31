import React, { memo } from 'react';

import Euro from '@/assets/icons/euro.svg';
import { CurrencyInfo } from '@/types';
import { formatRate } from '@/utils/formatRate';

import styles from './styles.module.scss';

interface CurrencyCardProps {
  onCurrencyCardClick: (currencyInfo: CurrencyInfo) => void;
  rate: number;
  asset_id_quote: string;
}

export const CurrencyCard = memo(
  ({ rate, asset_id_quote, onCurrencyCardClick }: CurrencyCardProps) => {
    const handleCurrencyCardClick = () => {
      onCurrencyCardClick({ rate, asset_id_quote });
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
        <Euro className={styles.icon} />
        <div className={styles.infoContainer}>
          <p className={styles.currencyName}>{asset_id_quote}</p>
          <p className={styles.currencyValue}>$ {formatRate(rate)}</p>
        </div>
      </div>
    );
  }
);
