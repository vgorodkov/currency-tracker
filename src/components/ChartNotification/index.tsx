import { Component } from 'react';

import closeSvg from '@/assets/icons/close.svg?url';
import observable from '@/observable';

import styles from './styles.module.scss';

interface ChartNotificationProps {}

interface ChartNotificationState {
  isActive: boolean;
}

export class ChartNotification extends Component<ChartNotificationProps, ChartNotificationState> {
  constructor(props: ChartNotificationProps) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    observable.subscribe(() => {
      this.setState({ isActive: true });
    });
  }

  componentWillUnmount() {
    observable.unsubscribe();
  }

  onCloseIconClick = () => {
    this.setState({ isActive: false });
  };

  render() {
    const { isActive } = this.state;
    if (!isActive) {
      return null;
    }
    return (
      <div className={styles.chartNotification}>
        <button type="button" onClick={this.onCloseIconClick}>
          <img className={styles.closeIcon} src={closeSvg} alt="close" />
        </button>
        <p>The chart was successfully built for month</p>
      </div>
    );
  }
}
