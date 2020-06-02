import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import * as React from 'react';
import './antd.css';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  NavLink,
  Redirect,
} from 'react-router-dom';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:9292/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

import './App.css';
import brand from './resources/brand.svg';

import EnterpriseAccount from './pages/enterpriseAccount/index';
import EnterpriseAccounts from './pages/enterpriseAccounts/index';

function App() {
  const location = useLocation();
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Sider width={220}>
          <img className="brand" src={brand} />
          <Menu mode="inline" selectedKeys={[location.pathname]}>
            <Menu.Item key="/">
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="/enterprise">
              <NavLink to="/enterprise">Enterprise Customers</NavLink>
            </Menu.Item>
            <Menu.Item key="/config">
              <NavLink to="/config">Developer Configuration</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content className="main">
            <Redirect from="/" to="/enterprise" />
            <Switch>
              <Route exact path="/enterprise">
                <EnterpriseAccounts />
              </Route>
              <Route path="/enterprise/:domain" component={EnterpriseAccount} />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
