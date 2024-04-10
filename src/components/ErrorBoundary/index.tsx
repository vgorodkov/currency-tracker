import React, { ErrorInfo } from 'react';

import { ErrorFallback } from '@/components/ErrorFallback';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorFallback errorInfo={errorInfo} />;
    }

    return children;
  }
}
