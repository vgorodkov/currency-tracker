import axios from 'axios';

import { CONVERTER_API_URL } from '@/constants/api';

export const getConvertedCurrency = async (from: string, to: string) => {
  const response = await axios.get(`${CONVERTER_API_URL}/${from}/${to}`, {
    headers: {
      Accept: 'application/json',
      'X-CoinAPI-Key': process.env.COINAPI_KEY,
    },
  });

  return response;
};
