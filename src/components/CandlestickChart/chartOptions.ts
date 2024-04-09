import 'chartjs-adapter-date-fns';

import { ChartOptions, TooltipItem } from 'chart.js';

import { OHLC } from '@/types/candlestickChart';

export const chartOptions: ChartOptions<'bar'> = {
  layout: {
    padding: {
      left: 24,
      bottom: 24,
    },
  },
  parsing: {
    xAxisKey: 'timestamp',
    yAxisKey: 'settlementPrice',
  },
  scales: {
    x: {
      type: 'timeseries',
      time: {
        unit: 'day',
        tooltipFormat: 'MMM, d, yyyy',
      },
      grid: {
        color: '#1C1C1D',
      },
    },
    y: {
      beginAtZero: true,
      grace: 1,
      grid: {
        color: '#1C1C1D',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        beforeBody: (tooltipItem: TooltipItem<'bar'>[]) => {
          const { openPrice, highPrice, lowPrice, closePrice } = tooltipItem[0].raw as OHLC;
          const bodyArr = [
            `O: ${openPrice}`,
            `H: ${highPrice}`,
            `L: ${lowPrice}`,
            `C: ${closePrice}`,
          ];
          return bodyArr;
        },
        label: () => {
          return '';
        },
      },
    },
  },
};
