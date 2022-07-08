import * as React from 'react';
import { render } from 'react-dom';
import ErrorBoundary from 'react-error-boundary';

import ErrorBoundaryFallback from './ErrorBoundaryFallback';
import App from './App';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  rootElement,
);
