/* eslint-disable react/prefer-stateless-function */
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPrice } from '@/redux/slices/candlestickChartSlice';
import { AppDispatch } from '@/redux/store';
import { SetPriceArgs } from '@/types';

import styles from './styles.module.scss';

interface PriceInputFieldProps {
  setPrice: ({ priceType, price }: SetPriceArgs) => void;
  priceType: 'o' | 'c' | 'h' | 'l';
  price: number;
  title: string;
}

export class PriceInputField extends Component<PriceInputFieldProps> {
  render() {
    const { setPrice: onPriceChange, priceType, price, title } = this.props;
    return (
      <div className={styles.inputRow}>
        <label htmlFor={priceType}>{title}: </label>
        <input
          id={priceType}
          type="number"
          value={price.toString()}
          onChange={(e) => onPriceChange({ priceType, price: e.target.valueAsNumber })}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      setPrice,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(PriceInputField);
