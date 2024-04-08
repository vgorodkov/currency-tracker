import 'chartjs-adapter-date-fns';

import Chart from 'chart.js/auto';
import { Component, createRef, RefObject } from 'react';

import { CandlestickData } from '@/types';

import { ChartDummy } from '../ChartDummy';
import { chartOptions } from './chartOptions';
import { candlestickPlugin } from './plugins/candlestickPlugin';
import { crosshairPlugin } from './plugins/crosshairPlugin';

interface CandlestickChartProps {
  candleSticksData: CandlestickData[];
}

class CandlestickChart extends Component<CandlestickChartProps> {
  private canvasRef: RefObject<HTMLCanvasElement>;

  private chartRef: Chart<'bar'> | null;

  constructor(props: CandlestickChartProps) {
    super(props);
    this.canvasRef = createRef<HTMLCanvasElement>();
    this.chartRef = null;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
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
        options: chartOptions,
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
