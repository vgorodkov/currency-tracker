import axios from 'axios';

import { EXCHANGES_API_URL } from '@/constants/api';
import { currencies } from '@/constants/currencies';

export const axiosConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: EXCHANGES_API_URL,
  params: {
    filter_asset_id: currencies.join(';'),
    invert: true,
  },
  headers: {
    Accept: 'application/json',
    'X-CoinAPI-Key': process.env.COINAPI_KEY,
  },
};

export const getExchangeRates = async () => {
  const response = await axios(axiosConfig);
  return response;
};
