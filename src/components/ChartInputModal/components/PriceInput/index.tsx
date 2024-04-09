import { ChangeEvent, PureComponent } from 'react';

import { Tooltip } from '@/components/UI/Tooltip';
import { Pricetype, SetPriceArgs } from '@/types';

import styles from './styles.module.scss';

interface PriceInputFieldProps {
  setPrice: ({ priceType, price }: SetPriceArgs) => void;
  priceType: Pricetype;
  price: number;
  title: string;
  disabled?: boolean;
}

export class PriceInputField extends PureComponent<PriceInputFieldProps> {
  onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { priceType, setPrice } = this.props;
    const value = e.target.valueAsNumber;

    setPrice({ priceType, price: value });
  };

  render() {
    const { priceType, price, title, disabled = false } = this.props;

    return (
      <div className={disabled ? `${styles.inputRow} ${styles.readonly}` : styles.inputRow}>
        <label htmlFor={priceType}>{title}: </label>
        <Tooltip
          shouldShow={disabled}
          content="Open value is always based on close value from previous day"
        >
          <input
            readOnly={disabled}
            id={priceType}
            type="number"
            value={price.toString()}
            onChange={this.onPriceChange}
          />
        </Tooltip>
      </div>
    );
  }
}

export default PriceInputField;
