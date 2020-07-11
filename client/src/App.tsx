import React from 'react';
import './antd.css';
import { Layout, Menu } from 'antd';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import './App.module.css';
import Logo from './resources/Logo.svg';
import Customers from './resources/Customers.svg';

import DeveloperConfig from './pages/developerConfiguration/index';
import EnterpriseAccount from './pages/enterpriseAccount/index';
import EnterpriseAccounts from './pages/enterpriseAccounts/index';
import { OssoProvider } from '@enterprise-oss/osso';

import Header from './components/Header/index';

function App() {
  const { Sider, Content } = Layout;
  const location = useLocation();
  const history = useHistory();

  return (
    <OssoProvider>
      <Layout>
        <Sider width={220}>
          <div className="brand">
            <Logo />
            <h1>Osso</h1>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname.split('/')[1]]}
            onClick={(e) => history.push(e.key as string)}
          >
            <Menu.Item
              key="enterprise"
              icon={
                <div style={{ marginRight: 10 }}>
                  <Customers />
                </div>
              }
            >
              Customers
            </Menu.Item>
            <Menu.Item key="config">Developer</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content className="main">
            <Switch>
              <Route exact path="/enterprise" component={EnterpriseAccounts} />
              <Route path="/enterprise/:domain" component={EnterpriseAccount} />
              <Route exact path="/config" component={DeveloperConfig} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </OssoProvider>
  );
}

export default App;
