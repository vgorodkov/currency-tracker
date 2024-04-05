import { PureComponent } from 'react';

import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { currencies } from '@/constants/currencies';

import styles from './styles.module.scss';

interface ChartCurrencySelectionProps {
  openModal: () => void;
  setTargetCurrency: (currency: string) => void;
  targetCurrency: string;
}

export class ChartCurrencySelection extends PureComponent<ChartCurrencySelectionProps> {
  render() {
    const { openModal, setTargetCurrency, targetCurrency } = this.props;
    return (
      <div className={styles.chartCurrencySelection}>
        <Dropdown options={currencies} selected={targetCurrency} handleSelect={setTargetCurrency} />
        <Button title="Enter data" onClick={openModal} />
      </div>
    );
  }
}
