import axios from 'axios';

import { withCache } from '@/utils/withCache';

const API_URL = 'https://rest.coinapi.io/v1/exchangerate';

const getConvertedCurrency = async (from: string, to: string) => {
  try {
    const response = await axios.get(`${API_URL}/${from}/${to}`, {
      headers: {
        Accept: 'application/json',
        'X-CoinAPI-Key': process.env.COINAPI_KEY,
      },
    });

    return response;
  } catch (e) {
    throw new Error('Erorr while converting currency');
  }
};

export const convertCurrency = async (from: string, to: string) => {
  const data = await withCache(() => getConvertedCurrency(from, to), `${from}-${to}`);
  return data;
};
