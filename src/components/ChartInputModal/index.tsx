/* eslint-disable react/prefer-stateless-function */
import { bindActionCreators } from '@reduxjs/toolkit';
import { Component } from 'react';
import { connect } from 'react-redux';

import {
  setChartData,
  setDate,
  setInputModalOpen,
  setPrice,
} from '@/redux/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { OHLC } from '@/types';

import { Modal } from '../Modal';
import PriceInput from './components/PriceInput';
import styles from './styles.module.scss';

interface ChartInputModalProps {
  setChartData: () => void;
  setDate: (date: string) => void;
  date: number;
  ohlc: OHLC;
  isInpuModalOpen: boolean;
  closeModal: () => void;
}

export class ChartInputModal extends Component<ChartInputModalProps> {
  render() {
    const {
      ohlc,
      isInpuModalOpen,
      setChartData: onSubmitBtnPress,
      date,
      setDate: onDateChange,
      closeModal,
    } = this.props;

    return (
      <Modal isActive={isInpuModalOpen} closeModal={closeModal}>
        <div className={styles.inputsContainer}>
          <input type="date" value={date} onChange={(e) => onDateChange(e.target.value)} />
          <PriceInput price={ohlc.o} priceType="o" title="Open price" />
          <PriceInput price={ohlc.h} priceType="h" title="High price" />
          <PriceInput price={ohlc.l} priceType="l" title="Low price" />
          <PriceInput price={ohlc.c} priceType="c" title="Close price" />
        </div>
        <button type="button" onClick={() => onSubmitBtnPress()}>
          Submit this date
        </button>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  ohlc: state.candlestickChart.ohlc,
  date: state.candlestickChart.date,
  isInpuModalOpen: state.candlestickChart.isInputModalOpen,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      setDate,
      setPrice,
      setChartData,
      closeModal: () => setInputModalOpen(false),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChartInputModal);
