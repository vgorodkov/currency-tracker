import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { currenciesInfo } from '@/constants/currencies';
import { RootState } from '@/store/types';

import styles from './styles.module.scss';
import { ChartCurrencyInfoProps } from './types';

class ChartCurrencyInfo extends PureComponent<ChartCurrencyInfoProps> {
  render() {
    const { targetCurrency } = this.props;
    return (
      <div className={styles.chartCurrencyInfoContainer}>
        <img
          className={styles.chartCurrencyInfoImg}
          src={currenciesInfo[targetCurrency].img}
          alt={targetCurrency}
        />
        <div className={styles.chartCurrencyInfo}>
          <h2>{currenciesInfo[targetCurrency].name}</h2>
          <h4>{targetCurrency}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  targetCurrency: state.candlestickChart.targetCurrency,
});

export default connect(mapStateToProps)(ChartCurrencyInfo);
