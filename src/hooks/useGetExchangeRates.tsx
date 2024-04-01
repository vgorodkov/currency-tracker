import { useEffect, useState } from 'react';

import { getExchangeRates } from '@/api/getExchangeRates';
import { ExchangeAsset } from '@/types';
import { withCache } from '@/utils/withCache';

const CACHE_KEY = 'exchange-rates';

export const useGetExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeAsset[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await withCache(getExchangeRates, CACHE_KEY);
        setExchangeRates(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { exchangeRates, isLoading, isError };
};
