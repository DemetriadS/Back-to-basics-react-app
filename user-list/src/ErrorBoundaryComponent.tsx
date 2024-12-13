import React from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

interface ErrorBoundaryComponentProps {
  children: React.ReactNode;
}

const ErrorBoundaryComponent: React.FC<ErrorBoundaryComponentProps> = ({
  children,
}) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundaryComponent;
