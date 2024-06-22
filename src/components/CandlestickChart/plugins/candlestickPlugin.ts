import { Plugin } from 'chart.js';

import { CandlestickData, ICandlestickChart } from '@/types/candlestickChart';

export const candlestickPlugin: Plugin<'bar', CandlestickData[]> = {
  id: 'candlestickPlugin',
  beforeDatasetsDraw(chart: ICandlestickChart) {
    const {
      ctx,
      data,
      scales: { y },
    } = chart;

    ctx.save();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#9EFF00';
    data.datasets[0].data.forEach((dataset, index) => {
      const { openPrice, closePrice } = dataset;

      if (closePrice >= openPrice) {
        ctx.strokeStyle = '#16C782';
      } else {
        ctx.strokeStyle = '#EA3943';
      }
      ctx.beginPath();

      ctx.moveTo(chart.getDatasetMeta(0).data[index].x, chart.getDatasetMeta(0).data[index].y);
      ctx.lineTo(
        chart.getDatasetMeta(0).data[index].x,
        y.getPixelForValue(data.datasets[0].data[index].highPrice)
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(chart.getDatasetMeta(0).data[index].x, chart.getDatasetMeta(0).data[index].y);
      ctx.lineTo(
        chart.getDatasetMeta(0).data[index].x,
        y.getPixelForValue(data.datasets[0].data[index].lowPrice)
      );
      ctx.stroke();
    });
  },
};
