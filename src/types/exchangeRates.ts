export interface ExchangeAsset {
  asset_id?: string;
  name?: string;
  type_is_crypto: number;
  data_quote_start?: Date;
  data_quote_end?: Date;
  data_orderbook_start?: Date;
  data_orderbook_end?: Date;
  data_trade_start?: Date;
  data_trade_end?: Date;
  data_symbols_count?: number;
  volume_1hrs_usd?: number;
  volume_1day_usd?: number;
  volume_1mth_usd?: number;
  price_usd?: number;
  id_icon?: string;
  supply_current?: number;
  supply_total?: number;
  supply_max?: number;
  data_start?: string;
  data_end?: string;
}
