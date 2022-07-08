import React from 'react';

import { Center } from './Layout';

export default function ErrorBoundaryFallback() {
  return (
    <Center>Oops, something went wrong. Try to refresh and try again.</Center>
  );
}
