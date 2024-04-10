import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { LoadingFallback } from '@/components/UI/LoadingFallback';
import { useAppDispatch } from '@/store/hooks';
import {
  cachedDateSelector,
  exchangeRatesSelector,
  isLoadingSelector,
} from '@/store/slices/exchangeRatesSlice/exchangeRatesSelectors';
import { fetchExchangeRates } from '@/store/slices/exchangeRatesSlice/exchangeRatesThunk';
import { getDate } from '@/utils/getDate';

import { CurrencyCard } from './components/CurrencyCard';
import styles from './styles.module.scss';

export const CurrencyExchangeList = () => {
  const dispatch = useAppDispatch();

  const cachedDate = useSelector(cachedDateSelector);
  const exchangeRates = useSelector(exchangeRatesSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    if (cachedDate < getDate()) {
      dispatch(fetchExchangeRates());
    }
  }, [dispatch, cachedDate]);

  return (
    <section className={styles.currencySection}>
      <h1 className={styles.currencySectionTitle}>Quotes</h1>
      {!isLoading ? (
        <ul className={styles.currencyList}>
          {exchangeRates.map(({ asset_id, price_usd, name }) => (
            <CurrencyCard key={asset_id} rate={price_usd} assetId={asset_id} assetName={name} />
          ))}
        </ul>
      ) : (
        <LoadingFallback />
      )}
    </section>
  );
};
