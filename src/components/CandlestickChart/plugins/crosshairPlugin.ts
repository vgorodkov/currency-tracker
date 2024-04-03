/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
export const crosshairPlugin = {
  id: 'crosshair',
  afterDatasetsDraw(chart) {
    const {
      ctx,

      tooltip,
      chartArea: { top, bottom, left, right },
      scales: { y },
    } = chart;
    if (tooltip._active && tooltip._active.length) {
      const activePoint = tooltip._active[0];
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#9EFF00';

      const lines = (startX, startY, endX, endY) => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
      };
      lines(activePoint.element.x, top, activePoint.element.x, bottom);
      lines(
        left,
        y.getPixelForValue(tooltip.dataPoints[0].raw.c),
        right,
        y.getPixelForValue(tooltip.dataPoints[0].raw.c)
      );
      ctx.setLineDash([]);

      // crosshair label
      ctx.beginPath();
      ctx.fillStyle = '#FF971D';
      ctx.fillRect(0, y.getPixelForValue(tooltip.dataPoints[0].raw.c) - 12, left, 24);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        tooltip.dataPoints[0].raw.c,
        left / 2,
        y.getPixelForValue(tooltip.dataPoints[0].raw.c)
      );

      chart.canvas.style.cursor = 'crosshair';
    } else {
      chart.canvas.style.cursor = 'default';
    }
  },
};
