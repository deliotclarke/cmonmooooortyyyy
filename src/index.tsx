import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CtxProvider } from './store';

ReactDOM.render(
  <CtxProvider>
    <App />
  </CtxProvider>,
  document.getElementById('root')
);
