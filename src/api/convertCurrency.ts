import axios from 'axios';

const API_URL = 'https://rest.coinapi.io/v1/exchangerate';

export const getConvertedCurrency = async (from: string, to: string) => {
  const response = await axios.get(`${API_URL}/${from}/${to}`, {
    headers: {
      Accept: 'application/json',
      'X-CoinAPI-Key': process.env.COINAPI_KEY,
    },
  });

  return response;
};
