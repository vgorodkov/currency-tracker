import { PureComponent } from 'react';

import { currenciesInfo } from '@/constants/currencies';

import styles from './styles.module.scss';

interface ChartCurrencyInfoProps {
  targetCurrency: string;
}

export class ChartCurrencyInfo extends PureComponent<ChartCurrencyInfoProps> {
  render() {
    const { targetCurrency } = this.props;
    return (
      <div className={styles.chartCurrencyInfoContainer}>
        <img
          className={styles.chartCurrencyInfoImg}
          src={currenciesInfo[targetCurrency].img}
          alt="currencyImg"
        />
        <div className={styles.chartCurrencyInfo}>
          <h2>{currenciesInfo[targetCurrency].name}</h2>
          <h4>{targetCurrency}</h4>
        </div>
      </div>
    );
  }
}

export default ChartCurrencyInfo;
