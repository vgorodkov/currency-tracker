import { ChangeEvent, PureComponent } from 'react';

import { Tooltip } from '@/components/UI/Tooltip';

import styles from './styles.module.scss';

interface DateInputProps {
  isFirstDateSelected: boolean;
  chartDayData: { date: string };
  setDate: (date: string) => void;
}

interface DateInputState {
  isTooltipVisible: boolean;
}

export class DateInput extends PureComponent<DateInputProps, DateInputState> {
  render() {
    const { isFirstDateSelected, chartDayData, setDate } = this.props;

    return (
      <Tooltip
        content="Once you have selected date, please fill in data one by one"
        shouldShow={isFirstDateSelected}
      >
        <div className={styles.dateInputWrapper}>
          <input
            className={styles.dateInputField}
            readOnly={isFirstDateSelected}
            type="date"
            value={chartDayData.date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </div>
      </Tooltip>
    );
  }
}
