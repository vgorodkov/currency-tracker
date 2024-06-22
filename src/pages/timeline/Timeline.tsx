import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CandlestickChart from '@/components/CandlestickChart';
import ChartCurrencyInfo from '@/components/ChartCurrencyInfo';
import ChartCurrencySelection from '@/components/ChartCurrencySelection';
import ChartInputModal from '@/components/ChartInputModal';
import { Toast } from '@/components/Toast';
import { RootState } from '@/store/types';
import observable from '@/utils/observable';

import { CHART_NOTIFICATION, MONTH_LENGTH } from './constants';
import styles from './styles.module.scss';
import { TimelineProps } from './types';

class Timeline extends PureComponent<TimelineProps> {
  componentDidMount(): void {}

  componentDidUpdate() {
    const { chartData } = this.props;
    if (chartData.length === MONTH_LENGTH) {
      observable.notify(CHART_NOTIFICATION);
    }
  }

  render() {
    const { chartData } = this.props;

    return (
      <div className={styles.container}>
        <Toast />
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
