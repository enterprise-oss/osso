import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <Router basename="/admin">
    <App />
  </Router>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
