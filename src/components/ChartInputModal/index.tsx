import { bindActionCreators } from '@reduxjs/toolkit';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, Tooltip } from '@/components/UI';
import { setChartData, setInputModalOpen } from '@/store/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/store/types';
import { Pricetype } from '@/types/candlestickChart';

import DateInput from './components/DateInput';
import PriceInputField from './components/PriceInput';
import { RULES } from './constants';
import styles from './styles.module.scss';
import { ChartInputModalProps } from './types';

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
    const { isFirstDateSelected, chartDayData } = this.props;

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
      closeModalConnect,
      chartDayData,
      isFirstDateSelected,
      setChartDataConnect,
    } = this.props;

    return (
      <Modal isActive={isInpuModalOpen} closeModal={closeModalConnect}>
        <form className={styles.inputsContainer}>
          <DateInput
            isFirstDateSelected={isFirstDateSelected}
            chartDayDataTimestamp={chartDayData.timestamp}
          />
          {this.renderPriceInputFields()}
        </form>
        <Tooltip content={RULES} shouldShow={!this.arePricesValid()}>
          <Button
            data-test="chart-build-btn"
            disabled={!this.arePricesValid()}
            title="Enter data"
            onClick={setChartDataConnect}
          />
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
      closeModalConnect: () => setInputModalOpen(false),
      setChartDataConnect: setChartData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChartInputModal);
