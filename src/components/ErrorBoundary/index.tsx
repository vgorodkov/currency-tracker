import React from 'react';

import { ErrorFallback } from '@/components/UI';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorFallback error={error.message} />;
    }

    return children;
  }
}
