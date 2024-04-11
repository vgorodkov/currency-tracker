export interface ConversionInfo {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

export interface Currency {
  code: string;
  rate: number;
}

export interface ConvertedCurrency extends Currency {
  cachedDate: number | null;
}
