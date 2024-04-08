import audSvg from '@/assets/icons/australian_dollar.svg?url';
import btcSvg from '@/assets/icons/bitcoin.svg?url';
import cadSvg from '@/assets/icons/canadian_dollar.svg?url';
import usdSvg from '@/assets/icons/dollar.svg?url';
import eurSvg from '@/assets/icons/euro.svg?url';
import gbpSvg from '@/assets/icons/libra.svg?url';
import arsSvg from '@/assets/icons/peso_argentino.svg?url';
import cnySvg from '@/assets/icons/won.svg?url';
import jpySvg from '@/assets/icons/yen.svg?url';

export const BASE_CURRENCY = 'USD';

export const currencies = ['BTC', 'ARS', 'EUR', 'CAD', 'JPY', 'AUD', 'CNY', 'GBP'];

export const currenciesInfo: Record<string, { img: string; name: string }> = {
  BTC: {
    img: btcSvg,
    name: 'Bitcoin',
  },
  ARS: {
    img: arsSvg,
    name: 'Argentine Peso',
  },
  EUR: {
    img: eurSvg,
    name: 'Euro',
  },
  CAD: {
    img: cadSvg,
    name: 'Canadian Dollar',
  },
  JPY: {
    img: jpySvg,
    name: 'Yen',
  },
  AUD: {
    img: audSvg,
    name: 'Australian dolar',
  },
  CNY: {
    img: cnySvg,
    name: 'Yuan',
  },
  GBP: {
    img: gbpSvg,
    name: 'British pounds',
  },
  USD: {
    img: usdSvg,
    name: 'Dollar',
  },
};
