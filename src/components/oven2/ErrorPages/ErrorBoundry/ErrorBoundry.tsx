// @ts-nocheck
import React, { Component } from 'react';
import ErrorContent from './ErrorContent';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null , error : '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Caught an error:", error );
    this.setState(prev => ({...prev , error : error.message }));
    // this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorContent error={this.state.error}/>
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;