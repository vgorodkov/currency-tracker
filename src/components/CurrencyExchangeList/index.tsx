import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { LoadingFallback } from '@/components/LoadingFallback';
import { fetchExchangeRates } from '@/redux/slices/exchangeRatesSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import { CurrencyCard } from './components/CurrencyCard';
import styles from './styles.module.scss';

export const CurrencyExchangeList = () => {
  const dispatch = useAppDispatch();

  const { exchangeRates, isLoading } = useSelector((state: RootState) => state.exchangeRates);

  useEffect(() => {
    dispatch(fetchExchangeRates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.currencySection}>
      <h1 className={styles.currencySectionTitle}>Quotes</h1>
      {!isLoading ? (
        <ul className={styles.currencyList}>
          {exchangeRates.map((item) => (
            <CurrencyCard
              key={item.asset_id}
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
