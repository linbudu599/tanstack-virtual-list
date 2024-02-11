import React from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/core';

import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GeistProvider>
    <CssBaseline />
    <App />
  </GeistProvider>
);
