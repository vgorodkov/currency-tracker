import { Chart } from 'chart.js/auto';
import { Component, createRef, RefObject } from 'react';

import { ChartDummy } from '@/components/ChartDummy';
import { CandlestickContext, CandlestickData, ICandlestickChart } from '@/types/candlestickChart';

import { chartOptions } from './chartOptions';
import { candlestickPlugin } from './plugins/candlestickPlugin';
import { crosshairPlugin } from './plugins/crosshairPlugin';

interface CandlestickChartProps {
  candleSticksData: CandlestickData[];
}

class CandlestickChart extends Component<CandlestickChartProps> {
  private canvasRef: RefObject<HTMLCanvasElement | null>;

  private chartRef: ICandlestickChart | null;

  constructor(props: CandlestickChartProps) {
    super(props);
    this.canvasRef = createRef<HTMLCanvasElement>();
    this.chartRef = null;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps: CandlestickChartProps) {
    const { candleSticksData } = this.props;
    if (candleSticksData !== prevProps.candleSticksData) {
      this.renderChart();
    }
  }

  componentWillUnmount() {
    if (this.chartRef) {
      this.chartRef.destroy();
      this.chartRef = null;
    }
  }

  renderChart() {
    const { candleSticksData } = this.props;

    if (this.chartRef) {
      this.chartRef.destroy();
      this.chartRef = null;
    }

    const canvasCtx = this.canvasRef.current?.getContext('2d');
    if (canvasCtx) {
      this.chartRef = new Chart(canvasCtx, {
        type: 'bar',
        data: {
          datasets: [
            {
              data: candleSticksData,
              backgroundColor: (ctx: CandlestickContext) => {
                const {
                  raw: { openPrice, closePrice },
                } = ctx;

                let color;
                if (closePrice >= openPrice) {
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
