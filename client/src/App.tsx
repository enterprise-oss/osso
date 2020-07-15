import './antd.css';
import './App.css';

import { OssoProvider } from '@enterprise-oss/osso';
import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from '~client/src/components/Menu';

import Header from './components/Header/index';
import DeveloperConfig from './pages/developerConfiguration/index';
import EnterpriseAccount from './pages/enterpriseAccount/index';
import EnterpriseAccounts from './pages/enterpriseAccounts/index';
import LogoWhite from './resources/LogoWhite.svg';

function App() {
  const { Sider, Content } = Layout;
  return (
    <OssoProvider>
      <Layout>
        <Sider
          width={220}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            zIndex: 10,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="brand">
            <LogoWhite />
            <h1>Osso</h1>
          </div>
          <Menu />
        </Sider>
        <Layout style={{ marginLeft: 220 }}>
          <Header />
          <Content className="main" style={{ marginTop: 88 }}>
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
