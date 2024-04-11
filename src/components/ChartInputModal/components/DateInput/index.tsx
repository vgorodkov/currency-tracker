import { bindActionCreators } from '@reduxjs/toolkit';
import { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';

import { Tooltip } from '@/components/UI/Tooltip';
import { setDayTimestamp } from '@/store/slices/candlestickChartSlice';
import { AppDispatch } from '@/store/types';
import { formatDate } from '@/utils/formatDate';

import { RULE } from './constants';
import styles from './styles.module.scss';
import { DateInputProps } from './types';

class DateInput extends PureComponent<DateInputProps> {
  render() {
    const { isFirstDateSelected, chartDayDataTimestamp, setDayTimestampConnect } = this.props;

    const onDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value);
      const newTimestamp = date.getTime();

      setDayTimestampConnect(newTimestamp);
    };

    return (
      <Tooltip content={RULE} shouldShow={isFirstDateSelected}>
        <div className={styles.dateInputWrapper}>
          <input
            className={styles.dateInputField}
            readOnly={isFirstDateSelected}
            type="date"
            value={formatDate(new Date(chartDayDataTimestamp))}
            onChange={onDateInputChange}
          />
        </div>
      </Tooltip>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      setDayTimestampConnect: setDayTimestamp,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(DateInput);
