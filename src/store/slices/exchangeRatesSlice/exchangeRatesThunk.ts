import { getExchangeRates } from '@/api/getExchangeRates';
import { createAppAsyncThunk } from '@/store/types';

export const fetchExchangeRates = createAppAsyncThunk(
  'exchangeRates/fetchExchangeRates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getExchangeRates();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
