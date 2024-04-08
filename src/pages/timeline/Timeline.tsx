import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CandlestickChart from '@/components/CandlestickChart';
import ChartCurrencyInfo from '@/components/ChartCurrencyInfo';
import ChartCurrencySelection from '@/components/ChartCurrencySelection';
import ChartInputModal from '@/components/ChartInputModal';
import { ChartNotification } from '@/components/ChartNotification';
import observable from '@/observable';
import { RootState } from '@/redux/store';
import { CandlestickData } from '@/types';

import styles from './styles.module.scss';

const MONTH_LENGTH = 30;

interface TimelineProps {
  chartData: CandlestickData[];
}

class Timeline extends PureComponent<TimelineProps> {
  componentDidMount(): void {}

  componentDidUpdate() {
    const { chartData } = this.props;
    if (chartData.length === MONTH_LENGTH) {
      observable.notify();
    }
  }

  render() {
    const { chartData } = this.props;

    return (
      <div className={styles.container}>
        <ChartNotification />
        <ChartCurrencySelection />
        <ChartCurrencyInfo />
        <CandlestickChart candleSticksData={chartData} />
        <ChartInputModal />
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  chartData: state.candlestickChart.chartData,
});

export default connect(mapStateToProps)(Timeline);
