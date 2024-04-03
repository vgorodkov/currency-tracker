/* eslint-disable react/prefer-stateless-function */
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPrice } from '@/redux/slices/candlestickChartSlice';
import { AppDispatch } from '@/redux/store';
import { SetPriceArgs } from '@/types';

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
      <label htmlFor={priceType}>
        {title}:{' '}
        <input
          id={priceType}
          type="number"
          value={price.toString()}
          onChange={(e) => onPriceChange({ priceType, price: e.target.valueAsNumber })}
        />
      </label>
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
