import axios from 'axios';

import { axiosConfig, getExchangeRates } from './getExchangeRates';

jest.mock('axios');
const mockedAxios = axios as unknown as jest.Mock;

describe('getExchangeRates', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch data from EXCHANGES_API_URL', async () => {
    const mockResponseData = {
      data: {
        asset_id: 'BTC',
        name: 'Bitcoin',
        type_is_crypto: 1,
        data_quote_start: '2014-02-24T00:00:00.0000000Z',
        data_quote_end: '2024-04-10T00:00:00.0000000Z',
        data_orderbook_start: '2014-02-24T17:43:05.0000000Z',
        data_orderbook_end: '2023-07-07T00:00:00.0000000Z',
        data_trade_start: '2010-07-17T00:00:00.0000000Z',
        data_trade_end: '2024-04-10T00:00:00.0000000Z',
        data_symbols_count: 215806,
        volume_1hrs_usd: 123.93,
        volume_1day_usd: 123.76,
        volume_1mth_usd: 123.54,
        price_usd: 123.2,
        id_icon: '4caf2b16-a017-4e26-a348-2cea69c34cba',
        data_start: '2010-07-17',
        data_end: '2024-04-10',
      },
    };

    mockedAxios.mockResolvedValue(mockResponseData);

    const response = await getExchangeRates();

    expect(mockedAxios).toHaveBeenCalledWith(axiosConfig);
    expect(response).toEqual(mockResponseData);
  });
});
