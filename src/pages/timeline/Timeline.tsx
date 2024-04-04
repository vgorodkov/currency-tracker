import 'chartjs-adapter-date-fns';

import { bindActionCreators } from '@reduxjs/toolkit';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CandlestickChart from '@/components/CandlestickChart';
import ChartInputModal from '@/components/ChartInputModal';
import { setInputModalOpen } from '@/redux/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { CandlestickData } from '@/types';

import styles from './styles.module.scss';

const candleSticksData: CandlestickData[] = [
  {
    x: new Date('2022-06-01').setHours(0, 0, 0, 0),
    o: 1.25,
    h: 1.35,
    l: 1.0,
    c: 1.1,
    s: [1.25, 1.1],
  },
  {
    x: new Date('2022-06-02').setHours(0, 0, 0, 0),
    o: 1.1,
    h: 1.35,
    l: 1.0,
    c: 1.2,
    s: [1.1, 1.2],
  },
  {
    x: new Date('2022-06-03').setHours(0, 0, 0, 0),
    o: 1.2,
    h: 1.5,
    l: 1.0,
    c: 1.5,
    s: [1.2, 1.5],
  },
  {
    x: new Date('2022-06-04').setHours(0, 0, 0, 0),
    o: 1.5,
    h: 1.8,
    l: 1.2,
    c: 1.4,
    s: [1.5, 1.4],
  },
  {
    x: new Date('2022-06-05').setHours(0, 0, 0, 0),
    o: 1.4,
    h: 2.0,
    l: 1.3,
    c: 1.75,
    s: [1.4, 1.75],
  },
  {
    x: new Date('2022-06-06').setHours(0, 0, 0, 0),
    o: 1.4,
    h: 2.0,
    l: 1.1,
    c: 1.2,
    s: [1.4, 1.2],
  },
  {
    x: new Date('2022-06-07').setHours(0, 0, 0, 0),
    o: 1.2,
    h: 2.0,
    l: 1.1,
    c: 1.8,
    s: [1.2, 1.8],
  },
  {
    x: new Date('2022-06-08').setHours(0, 0, 0, 0),
    o: 1.8,
    h: 2.5,
    l: 1.3,
    c: 2.1,
    s: [1.8, 2.1],
  },
  {
    x: new Date('2022-06-09').setHours(0, 0, 0, 0),
    o: 2.1,
    h: 2.9,
    l: 1.9,
    c: 2.5,
    s: [2.1, 2.5],
  },
  {
    x: new Date('2022-06-10').setHours(0, 0, 0, 0),
    o: 2.5,
    h: 2.7,
    l: 1.4,
    c: 1.8,
    s: [2.5, 1.8],
  },
];

interface TimelineProps {
  openModal: () => void;
}

class Timeline extends PureComponent<TimelineProps> {
  render() {
    const { openModal } = this.props;

    return (
      <div className={styles.container}>
        <button type="button" onClick={openModal}>
          Enter data
        </button>
        <ChartInputModal />
        <CandlestickChart candleSticksData={candleSticksData} />
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  chartData: state.candlestickChart.chartData,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      openModal: () => setInputModalOpen(true),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
