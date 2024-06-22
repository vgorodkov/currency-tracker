import { Pricetype, SetPriceArgs } from '@/types/candlestickChart';

export interface PriceInputFieldProps {
  setPriceConnect: ({ priceType, price }: SetPriceArgs) => void;
  priceType: Pricetype;
  price: number;
  title: string;
  disabled?: boolean;
}
