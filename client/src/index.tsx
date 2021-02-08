import './index.css';

import { init as sentryInit } from '@sentry/react';
import posthog from 'posthog-js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

if (process.env.CLIENT_SENTRY_DSN) {
  sentryInit({
    dsn: process.env.CLIENT_SENTRY_DSN,
  });
}

if (process.env.POSTHOG_TOKEN) {
  posthog.init(process.env.POSTHOG_TOKEN, {
    api_host: process.env.POSTHOG_API_HOST,
  });

  posthog.register({
    osso_plan: process.env.OSSO_PLAN || 'community',
  });
}

ReactDOM.render(
  <Router basename="/admin">
    <App />
  </Router>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
