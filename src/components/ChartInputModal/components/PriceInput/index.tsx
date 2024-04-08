import { ChangeEvent, PureComponent } from 'react';

import { Tooltip } from '@/components/Tooltip';
import { Pricetype, SetPriceArgs } from '@/types';

import styles from './styles.module.scss';

interface PriceInputFieldProps {
  setPrice: ({ priceType, price }: SetPriceArgs) => void;
  priceType: Pricetype;
  price: number;
  title: string;
  disabled?: boolean;
}

interface PriceInputFieldState {
  isTooltipVisible: boolean;
}

export class PriceInputField extends PureComponent<PriceInputFieldProps, PriceInputFieldState> {
  constructor(props: PriceInputFieldProps) {
    super(props);
    this.state = {
      isTooltipVisible: false,
    };
  }

  onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { priceType, setPrice } = this.props;
    const value = e.target.valueAsNumber;

    setPrice({ priceType, price: value });
  };

  handleMouseEnter = () => {
    const { disabled } = this.props;
    if (disabled) {
      this.setState({ isTooltipVisible: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ isTooltipVisible: false });
  };

  render() {
    const { priceType, price, title, disabled = false } = this.props;
    const { isTooltipVisible } = this.state;

    return (
      <div className={disabled ? `${styles.inputRow} ${styles.readonly}` : styles.inputRow}>
        <label htmlFor={priceType}>{title}: </label>
        <input
          readOnly={disabled}
          id={priceType}
          type="number"
          value={price.toString()}
          onChange={this.onPriceChange}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
        {disabled && isTooltipVisible && (
          <Tooltip content="Open value is always based on close value from previous day" />
        )}
      </div>
    );
  }
}

export default PriceInputField;
