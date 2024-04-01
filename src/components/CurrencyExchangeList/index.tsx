import { LoadingFallback } from '@/components/LoadingFallback';
import { useGetExchangeRates } from '@/hooks/useGetExchangeRates';
import { CurrencyInfo } from '@/types';

import { CurrencyCard } from './components/CurrencyCard';
import styles from './styles.module.scss';

interface ExchangeRatesListProps {
  onCurrencyCardClick: (currencyInfo: CurrencyInfo) => void;
}

export const CurrencyExchangeList = ({ onCurrencyCardClick }: ExchangeRatesListProps) => {
  const { isLoading, exchangeRates } = useGetExchangeRates();

  return (
    <section className={styles.currencySection}>
      <h1 className={styles.currencySectionTitle}>Quotes</h1>
      {!isLoading ? (
        <ul className={styles.currencyList}>
          {exchangeRates.map((item) => (
            <CurrencyCard
              key={item.asset_id}
              onCurrencyCardClick={onCurrencyCardClick}
              rate={item.price_usd}
              assetId={item.asset_id}
              assetName={item.name}
            />
          ))}
        </ul>
      ) : (
        <LoadingFallback />
      )}
    </section>
  );
};
