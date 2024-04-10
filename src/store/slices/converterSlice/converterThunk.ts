import { getConvertedCurrency } from '@/api/convertCurrency';
import { createAppAsyncThunk } from '@/store/types';

export const convertCurrency = createAppAsyncThunk(
  'converter/convertCurrency',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { toCurrency, fromCurrency } = getState().converter;

      const response = await getConvertedCurrency(fromCurrency.code, toCurrency.code);
      const { rate, asset_id_base: fromCode, asset_id_quote: toCode } = response.data;

      return {
        fromCode,
        toCode,
        rate,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
