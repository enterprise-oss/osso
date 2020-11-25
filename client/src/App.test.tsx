import * as React from 'react';

import renderWithRouter from '../renderWithRouter';
import App from './App';

xtest('renders without crashing', () => {
  renderWithRouter(<App />);
});
