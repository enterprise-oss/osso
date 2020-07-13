import React from 'react';
import './antd.css';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Logo from './resources/Logo.svg';

import Menu from '~client/src/components/Menu';

import DeveloperConfig from './pages/developerConfiguration/index';
import EnterpriseAccount from './pages/enterpriseAccount/index';
import EnterpriseAccounts from './pages/enterpriseAccounts/index';
import { OssoProvider } from '@enterprise-oss/osso';

import Header from './components/Header/index';

function App() {
  const { Sider, Content } = Layout;
  return (
    <OssoProvider>
      <Layout>
        <Sider width={220}>
          <div className="brand">
            <Logo />
            <h1>Osso</h1>
          </div>
          <Menu />
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
