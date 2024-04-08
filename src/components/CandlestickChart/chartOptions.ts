import { ChartOptions } from 'chart.js';

export const chartOptions: ChartOptions<'bar'> = {
  layout: {
    padding: {
      left: 24,
      bottom: 24,
    },
  },
  parsing: {
    xAxisKey: 'x',
    yAxisKey: 's',
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
        beforeBody: (ctx) => {
          const { o, h, l, c } = ctx[0].raw;
          const bodyArr = [`O: ${o}`, `H: ${h}`, `L: ${l}`, `C: ${c}`];
          return bodyArr;
        },
        label: () => {
          return '';
        },
      },
    },
  },
};
