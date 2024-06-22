import { bindActionCreators } from '@reduxjs/toolkit';
import { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';

import { Tooltip } from '@/components/UI/Tooltip';
import { setPrice } from '@/store/slices/candlestickChartSlice';
import { AppDispatch } from '@/store/types';

import { RULE } from './constants';
import styles from './styles.module.scss';
import { PriceInputFieldProps } from './types';

class PriceInputField extends PureComponent<PriceInputFieldProps> {
  onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { priceType, setPriceConnect } = this.props;
    const value = e.target.valueAsNumber;

    if (Number.isNaN(value)) {
      setPriceConnect({ priceType, price: 0 });
      return;
    }

    setPriceConnect({ priceType, price: Math.max(0, value) });
  };

  render() {
    const { priceType, price, title, disabled = false } = this.props;

    return (
      <div className={disabled ? `${styles.inputRow} ${styles.readonly}` : styles.inputRow}>
        <label htmlFor={priceType}>{title}: </label>
        <Tooltip shouldShow={disabled} content={RULE}>
          <input
            data-test={`input-${priceType}`}
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

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      setPriceConnect: setPrice,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(PriceInputField);
