import { PureComponent } from 'react';

import styles from './styles.module.scss';

export class ChartDummy extends PureComponent {
  render() {
    return (
      <div data-test="chart-dummy" className={styles.chartDummy}>
        <h1>No data to build chart. Please start entering data</h1>
      </div>
    );
  }
}
