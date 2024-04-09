import { ICandlestickChart, OHLC } from '@/types/candlestickChart';

export const crosshairPlugin = {
  id: 'crosshair',
  afterDatasetsDraw(chart: ICandlestickChart) {
    const updatedChart = { ...chart };

    const {
      ctx,
      tooltip,
      chartArea: { top, bottom, left, right },
      scales: { y },
    } = chart;

    const activeElements = tooltip.getActiveElements();

    if (activeElements && activeElements.length) {
      const activePoint = activeElements[0];
      const tooltipDataRaw = tooltip.dataPoints[0].raw as OHLC;

      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#9EFF00';

      const lines = (startX: number, startY: number, endX: number, endY: number) => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
      };

      lines(activePoint.element.x, top, activePoint.element.x, bottom);
      lines(
        left,
        y.getPixelForValue(tooltipDataRaw.closePrice),
        right,
        y.getPixelForValue(tooltipDataRaw.closePrice)
      );
      ctx.setLineDash([]);

      // crosshair label
      ctx.beginPath();
      ctx.fillStyle = '#FF971D';
      ctx.fillRect(0, y.getPixelForValue(tooltipDataRaw.closePrice) - 12, left, 24);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        tooltipDataRaw.closePrice.toString(),
        left / 2,
        y.getPixelForValue(tooltipDataRaw.closePrice)
      );

      updatedChart.canvas.style.cursor = 'crosshair';
    } else {
      updatedChart.canvas.style.cursor = 'default';
    }
  },
};
