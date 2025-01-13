import React from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { ErrorBoundaryProps } from "../../types";
import { ERROR_MESSAGES } from "../../utils/constants.ts";

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  return (
    <div role="alert">
      <p>{ERROR_MESSAGES.GENERIC_ERROR}</p>
      <pre>{error.message}</pre>
    </div>
  );
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
