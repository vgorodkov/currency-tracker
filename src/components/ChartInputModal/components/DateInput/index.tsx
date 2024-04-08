import { ChangeEvent, PureComponent } from 'react';

import { Tooltip } from '@/components/Tooltip';

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
  constructor(props: DateInputProps) {
    super(props);
    this.state = {
      isTooltipVisible: false,
    };
  }

  handleMouseEnter = () => {
    const { isFirstDateSelected } = this.props;
    if (isFirstDateSelected) {
      this.setState({ isTooltipVisible: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ isTooltipVisible: false });
  };

  render() {
    const { isFirstDateSelected, chartDayData, setDate } = this.props;
    const { isTooltipVisible } = this.state;

    return (
      <div className={styles.dateInputWrapper}>
        <input
          className={styles.dateInputField}
          readOnly={isFirstDateSelected}
          type="date"
          value={chartDayData.date}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
        {isTooltipVisible && isFirstDateSelected && (
          <Tooltip content="Once you have selected date, please fill in data one by one" />
        )}
      </div>
    );
  }
}
