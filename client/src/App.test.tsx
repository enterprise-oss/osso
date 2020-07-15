import * as React from 'react';

import renderWithRouter from '../renderWithRouter';
import App from './App';

test('renders without crashing', () => {
  renderWithRouter(<App />);
});
