import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

function renderWithRouter(children, route = '/') {
  const router = <Router initialEntries={[route]}>{children}</Router>;

  return mount(router);
}

export default renderWithRouter;
