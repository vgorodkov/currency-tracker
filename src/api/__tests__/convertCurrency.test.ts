import axios from 'axios';

import { CONVERTER_API_URL } from '@/constants/api';

import { getConvertedCurrency } from '../convertCurrency';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getConvertedCurrency', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch data from CONVERTER_API_URL', async () => {
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const url = `${CONVERTER_API_URL}/${fromCurrency}/${toCurrency}`;

    const mockResponseData = {
      data: {
        time: '2024-04-11T12:22:00.0000000Z',
        asset_id_base: 'USD',
        asset_id_quote: 'EUR',
        rate: 0.123,
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponseData);

    const response = await getConvertedCurrency(fromCurrency, toCurrency);

    expect(mockedAxios.get).toHaveBeenCalledWith(url, {
      headers: {
        Accept: 'application/json',
        'X-CoinAPI-Key': process.env.COINAPI_KEY,
      },
    });

    expect(response).toEqual(mockResponseData);
  });
});
