import { LoaderSpinner } from '@/components/LoaderSpinner';
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
      {isLoading && (
        <div className={styles.loaderContainer}>
          <p>Quotes loading...</p>
          <LoaderSpinner />
        </div>
      )}
      {!isLoading && (
        <ul className={styles.currencyList}>
          {exchangeRates.map((item) => (
            <CurrencyCard
              key={item.asset_id_quote}
              onCurrencyCardClick={onCurrencyCardClick}
              rate={item.rate}
              asset_id_quote={item.asset_id_quote}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
