/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';

import { Pricetype } from '@/redux/slices/candlestickChartSlice';
import { SetPriceArgs } from '@/types';

import styles from './styles.module.scss';

interface PriceInputFieldProps {
  setPrice: ({ priceType, price }: SetPriceArgs) => void;
  priceType: Pricetype;
  price: number;
  title: string;
  disabled?: boolean;
}

export class PriceInputField extends PureComponent<PriceInputFieldProps> {
  render() {
    const { setPrice: onPriceChange, priceType, price, title, disabled = false } = this.props;
    return (
      <div className={disabled ? `${styles.inputRow} ${styles.readonly}` : styles.inputRow}>
        <label htmlFor={priceType}>{title}: </label>
        <input
          readOnly={disabled}
          id={priceType}
          type="number"
          value={price.toString()}
          onChange={(e) => onPriceChange({ priceType, price: e.target.valueAsNumber })}
        />
      </div>
    );
  }
}

export default PriceInputField;
