import { OssoProvider } from '@enterprise-oss/osso';
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


import './App.css';
import Brand from './resources/brand.svg';

import DeveloperConfig from './pages/developerConfiguration/index'
import EnterpriseAccount from './pages/enterpriseAccount/index';
import EnterpriseAccounts from './pages/enterpriseAccounts/index';

function App() {
  const location = useLocation();
  console.log(location.pathname.split('/')[1])
  return (
    <Layout>
      <Sider width={220}>
        <Brand className="brand" />
        <Menu mode="inline" selectedKeys={[location.pathname.split('/')[1]]}>
          <Menu.Item key=''>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="enterprise">
            <NavLink to="/enterprise">Enterprise Customers</NavLink>
          </Menu.Item>
          <Menu.Item key="/config">
            <NavLink to="/config">Developer Configuration</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>Header HMR</Header>
        <Content className="main">
          <Switch>
            <Route exact path="/admin/enterprise">
              <EnterpriseAccounts />
            </Route>
            <Route path="/admin/enterprise/:domain" component={EnterpriseAccount} />
            <Route exact path="/admin/config">
              <DeveloperConfig />
            </Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;

