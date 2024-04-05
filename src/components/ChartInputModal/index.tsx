/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prefer-stateless-function */
import { bindActionCreators } from '@reduxjs/toolkit';
import { Component } from 'react';
import { connect } from 'react-redux';

import {
  ChartDayData,
  Pricetype,
  setChartData,
  setDate,
  setInputModalOpen,
  setPrice,
} from '@/redux/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { SetPriceArgs } from '@/types';

import { Button } from '../Button';
import { Modal } from '../Modal';
import { PriceInputField } from './components/PriceInput';
import styles from './styles.module.scss';

interface ChartInputModalProps {
  chartDayData: ChartDayData;
  isInpuModalOpen: boolean;
  closeModal: () => void;
  setDate: (date: string) => void;
  setPrice: ({ priceType, price }: SetPriceArgs) => void;
  setChartData: () => void;
  isFirstDateSelected: boolean;
}

export class ChartInputModal extends Component<ChartInputModalProps> {
  renderPriceInputFields() {
    const { isFirstDateSelected, chartDayData, setPrice } = this.props;

    const priceInputs = [
      {
        priceType: Pricetype.o,
        title: 'Open',
        price: chartDayData.o,
        disabled: isFirstDateSelected,
      },
      { priceType: Pricetype.h, title: 'High', price: chartDayData.h, disabled: false },
      { priceType: Pricetype.l, title: 'Low', price: chartDayData.l, disabled: false },
      { priceType: Pricetype.c, title: 'Close', price: chartDayData.c, disabled: false },
    ];

    return priceInputs.map((input) => (
      <PriceInputField
        key={input.priceType}
        setPrice={setPrice}
        priceType={input.priceType}
        title={input.title}
        price={input.price}
        disabled={input.disabled}
      />
    ));
  }

  render() {
    const {
      isInpuModalOpen,
      closeModal,
      chartDayData,
      setDate,
      setChartData,
      isFirstDateSelected,
    } = this.props;

    return (
      <Modal isActive={isInpuModalOpen} closeModal={closeModal}>
        <form className={styles.inputsContainer}>
          <input
            className={styles.dateInputField}
            disabled={isFirstDateSelected}
            type="date"
            value={chartDayData.date}
            onChange={(e) => setDate(e.target.value)}
          />
          {this.renderPriceInputFields()}
          <Button title="Enter data" onClick={() => setChartData()} />
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  chartDayData: state.candlestickChart.chartDayData,
  isInpuModalOpen: state.candlestickChart.isInputModalOpen,
  isFirstDateSelected: state.candlestickChart.chartData.length >= 1,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      closeModal: () => setInputModalOpen(false),
      setDate,
      setPrice,
      setChartData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChartInputModal);
