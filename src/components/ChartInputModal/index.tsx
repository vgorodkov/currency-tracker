/* eslint-disable @typescript-eslint/no-shadow */

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
import { ChartDayData, Pricetype, SetPriceArgs } from '@/types';

import { Button } from '../Button';
import { Modal } from '../Modal';
import { Tooltip } from '../Tooltip';
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
    const { o, c, h, l } = chartDayData;

    const areGreaterThanZero = o > 0 && c > 0 && h > 0 && l > 0;

    const isCloseValid = c !== o;

    const isHighGreater = h > l;

    return areGreaterThanZero && isCloseValid && isHighGreater;
  };

  renderPriceInputFields = () => {
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
