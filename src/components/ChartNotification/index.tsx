import React, { Component } from 'react';

import observable from '@/observable';

import { Button } from '../Button';
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

  render() {
    const { isActive } = this.state;
    if (!isActive) {
      return null;
    }
    return (
      <div className={styles.chartNotification}>
        <p>The chart was successfully built for month</p>
        <Button title="close" onClick={() => this.setState({ isActive: false })} />
      </div>
    );
  }
}
