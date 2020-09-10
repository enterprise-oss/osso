import 'ant-theme/dist/index.less';

import { OssoProvider } from '@enterprise-oss/osso';
import { Layout } from 'antd';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import styles from './App.module.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DeveloperConfig from './pages/developerConfiguration';
import EnterpriseAccount from './pages/enterpriseAccount';
import EnterpriseAccounts from './pages/enterpriseAccounts';
import OauthClientConfig from './pages/oauthClientConfig';

function App(): ReactElement {
  return (
    <OssoProvider>
      <Layout>
        <Sidebar />
        <Layout className={styles.main}>
          <Header />
          <Layout.Content className={styles.content}>
            <Switch>
              <Route exact path="/enterprise" component={EnterpriseAccounts} />
              <Route path="/enterprise/:domain" component={EnterpriseAccount} />
              <Route exact path="/config" component={DeveloperConfig} />
              <Route path="/config/:id" component={OauthClientConfig} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </OssoProvider>
  );
}

export default App;
