/* eslint-disable @typescript-eslint/no-shadow */
import { bindActionCreators } from '@reduxjs/toolkit';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Button, Dropdown } from '@/components/UI/';
import { currencies } from '@/constants/currencies';
import { setInputModalOpen, setTargetCurrency } from '@/redux/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/redux/store';

import styles from './styles.module.scss';

interface ChartCurrencySelectionProps {
  targetCurrency: string;
  openModal: () => void;
  setTargetCurrency: (currency: string) => void;
}

class ChartCurrencySelection extends PureComponent<ChartCurrencySelectionProps> {
  render() {
    const { targetCurrency, openModal, setTargetCurrency } = this.props;

    return (
      <div className={styles.chartCurrencySelection}>
        <Dropdown options={currencies} selected={targetCurrency} handleSelect={setTargetCurrency} />
        <div>
          <Button title="Enter data" onClick={openModal} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      openModal: () => setInputModalOpen(true),
      setTargetCurrency: (currency) => setTargetCurrency(currency),
    },
    dispatch
  );

const mapStateToProps = (state: RootState) => ({
  targetCurrency: state.candlestickChart.targetCurrency,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartCurrencySelection);
