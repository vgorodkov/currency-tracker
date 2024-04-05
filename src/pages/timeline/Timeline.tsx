/* eslint-disable @typescript-eslint/no-shadow */
import 'chartjs-adapter-date-fns';

import { bindActionCreators } from '@reduxjs/toolkit';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CandlestickChart from '@/components/CandlestickChart';
import ChartCurrencyInfo from '@/components/ChartCurrencyInfo';
import { ChartCurrencySelection } from '@/components/ChartCurrencySelection';
import ChartInputModal from '@/components/ChartInputModal';
import { setInputModalOpen, setTargetCurrency } from '@/redux/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { CandlestickData } from '@/types';

import styles from './styles.module.scss';

interface TimelineProps {
  openModal: () => void;
  setTargetCurrency: (currency: string) => void;
  targetCurrency: string;
  chartData: CandlestickData[];
}

class Timeline extends PureComponent<TimelineProps> {
  render() {
    const { openModal, setTargetCurrency, targetCurrency, chartData } = this.props;

    return (
      <div className={styles.container}>
        <ChartCurrencySelection
          targetCurrency={targetCurrency}
          openModal={openModal}
          setTargetCurrency={setTargetCurrency}
        />
        <ChartCurrencyInfo targetCurrency={targetCurrency} />
        <CandlestickChart candleSticksData={chartData} />
        <ChartInputModal />
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  chartData: state.candlestickChart.chartData,
  targetCurrency: state.candlestickChart.targetCurrency,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      openModal: () => setInputModalOpen(true),
      setTargetCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
