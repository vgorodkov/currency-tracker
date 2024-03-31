export interface CurrencyInfo {
  rate: number;
  asset_id_quote: string;
}

export interface ExchangeRate extends CurrencyInfo {
  time: string;
}

export interface ConverterCurrency {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}
