/* eslint-disable @typescript-eslint/no-shadow */

import { bindActionCreators } from '@reduxjs/toolkit';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, Tooltip } from '@/components/UI';
import {
  setChartData,
  setDate,
  setInputModalOpen,
  setPrice,
} from '@/redux/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { ChartDayData, Pricetype, SetPriceArgs } from '@/types/candlestickChart';

import { DateInput } from './components/DateInput';
import { PriceInputField } from './components/PriceInput';
import styles from './styles.module.scss';

const RULES =
  'Price values should be greater than 0. Open and Close cannot be equal. High must be greater than Low';

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
  arePricesValid = (): boolean => {
    const { chartDayData } = this.props;
    const { openPrice, closePrice, highPrice, lowPrice } = chartDayData;

    const areGreaterThanZero = openPrice > 0 && closePrice > 0 && highPrice > 0 && lowPrice > 0;

    const isCloseValid = closePrice !== openPrice;

    const isHighGreater = highPrice > lowPrice;

    return areGreaterThanZero && isCloseValid && isHighGreater;
  };

  renderPriceInputFields = () => {
    const { isFirstDateSelected, chartDayData, setPrice } = this.props;

    const priceInputs = [
      {
        priceType: Pricetype.OPEN,
        title: 'Open',
        price: chartDayData.openPrice,
        disabled: isFirstDateSelected,
      },
      { priceType: Pricetype.HIGH, title: 'High', price: chartDayData.highPrice, disabled: false },
      { priceType: Pricetype.LOW, title: 'Low', price: chartDayData.lowPrice, disabled: false },
      {
        priceType: Pricetype.CLOSE,
        title: 'Close',
        price: chartDayData.closePrice,
        disabled: false,
      },
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
  };

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
          <DateInput
            isFirstDateSelected={isFirstDateSelected}
            chartDayData={chartDayData}
            setDate={setDate}
          />
          {this.renderPriceInputFields()}
        </form>
        <Tooltip content={RULES} shouldShow={!this.arePricesValid()}>
          <Button disabled={!this.arePricesValid()} title="Enter data" onClick={setChartData} />
        </Tooltip>
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
