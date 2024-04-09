import { Component } from 'react';

import closeSvg from '@/assets/icons/close.svg?url';
import observable from '@/utils/observable';

import styles from './styles.module.scss';

interface ToastProps {}

interface ToastState {
  isActive: boolean;
  toastTextContent: string;
}

export class Toast extends Component<ToastProps, ToastState> {
  constructor(props: ToastProps) {
    super(props);
    this.state = {
      isActive: false,
      toastTextContent: '',
    };
  }

  componentDidMount() {
    observable.subscribe(this.showToast);
  }

  componentWillUnmount() {
    observable.unsubscribe(this.showToast);
  }

  showToast = (toastTextContent: string) => {
    this.setState({ isActive: true, toastTextContent });
  };

  onCloseIconClick = () => {
    this.setState({ isActive: false });
  };

  render() {
    const { isActive, toastTextContent } = this.state;
    if (!isActive) {
      return null;
    }
    return (
      <div className={styles.chartNotification}>
        <button type="button" onClick={this.onCloseIconClick}>
          <img className={styles.closeIcon} src={closeSvg} alt="close" />
        </button>
        <p>{toastTextContent}</p>
      </div>
    );
  }
}
