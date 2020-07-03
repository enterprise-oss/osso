import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { OssoProvider } from '@enterprise-oss/osso';

ReactDOM.render(
  <OssoProvider client={{ uri: process.env.OSSO_BASE_URL! }}>
    <Router basename="/admin">
      <App />
    </Router>
  </OssoProvider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
