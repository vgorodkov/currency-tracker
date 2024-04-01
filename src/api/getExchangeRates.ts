import axios from 'axios';

import { currencies } from '@/constants/currencies';

const API_URL = 'https://rest.coinapi.io/v1/assets';

const axiosConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: API_URL,
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
  try {
    const response = await axios(axiosConfig);
    return response;
  } catch {
    throw new Error('Error while fetching');
  }
};
