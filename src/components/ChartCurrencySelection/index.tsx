import { bindActionCreators } from '@reduxjs/toolkit';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Button, Dropdown } from '@/components/UI/';
import { currencies } from '@/constants/currencies';
import { setInputModalOpen, setTargetCurrency } from '@/store/slices/candlestickChartSlice';
import { AppDispatch, RootState } from '@/store/types';

import styles from './styles.module.scss';
import { ChartCurrencySelectionProps } from './types';

class ChartCurrencySelection extends PureComponent<ChartCurrencySelectionProps> {
  render() {
    const { targetCurrency, openModalConnect, setTargetCurrencyConnect } = this.props;

    const handleOptionSelect = (option: string) => {
      if (targetCurrency !== option) {
        setTargetCurrencyConnect(option);
      }
    };

    return (
      <div className={styles.chartCurrencySelection}>
        <Dropdown
          options={currencies}
          selected={targetCurrency}
          handleSelect={handleOptionSelect}
        />
        <div>
          <Button title="Enter data" onClick={openModalConnect} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      openModalConnect: () => setInputModalOpen(true),
      setTargetCurrencyConnect: (currency) => setTargetCurrency(currency),
    },
    dispatch
  );

const mapStateToProps = (state: RootState) => ({
  targetCurrency: state.candlestickChart.targetCurrency,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartCurrencySelection);
