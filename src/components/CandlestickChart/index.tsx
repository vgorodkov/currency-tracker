import Chart from 'chart.js/auto';
import { Component, createRef, RefObject } from 'react';

import { CandlestickData } from '@/types';

import { ChartDummy } from '../ChartDummy';
import { candlestickPlugin } from './plugins/candlestickPlugin';
import { crosshairPlugin } from './plugins/crosshairPlugin';

interface CandlestickChartProps {
  candleSticksData: CandlestickData[];
}

class CandlestickChart extends Component<CandlestickChartProps> {
  private canvasRef: RefObject<HTMLCanvasElement>;

  private chartRef: Chart | null;

  constructor(props: CandlestickChartProps) {
    super(props);
    this.canvasRef = createRef<HTMLCanvasElement>();
    this.chartRef = null;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(): void {
    this.renderChart();
  }

  componentWillUnmount() {
    if (this.chartRef) {
      this.chartRef.destroy();
    }
  }

  renderChart() {
    const { candleSticksData } = this.props;

    if (this.chartRef) {
      this.chartRef.destroy();
    }

    const canvasCtx = this.canvasRef.current?.getContext('2d');
    if (canvasCtx) {
      this.chartRef = new Chart(canvasCtx, {
        type: 'bar',
        data: {
          datasets: [
            {
              data: candleSticksData,
              backgroundColor: (ctx) => {
                const {
                  raw: { o, c },
                } = ctx;

                let color;
                if (c >= o) {
                  color = '#16C782';
                } else {
                  color = '#EA3943';
                }
                return color;
              },

              borderSkipped: false,
            },
          ],
        },
        options: {
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
        },
        plugins: [candlestickPlugin, crosshairPlugin],
      });
    }
  }

  render() {
    const { candleSticksData } = this.props;
    if (candleSticksData.length < 1) {
      return <ChartDummy />;
    }

    return <canvas ref={this.canvasRef} />;
  }
}

export default CandlestickChart;
