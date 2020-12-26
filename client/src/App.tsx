import '@enterprise-oss/ant-theme';

import { OssoProvider } from '@enterprise-oss/osso';
import { Col, Layout, Row } from 'antd';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import styles from './App.module.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DeveloperConfig from './pages/developerConfiguration';
import EnterpriseAccount from './pages/enterpriseAccount';
import EnterpriseAccounts from './pages/enterpriseAccounts';
import Login from './pages/login';
import OauthClientConfig from './pages/oauthClientConfig';
import VerifyAccount from './pages/verifyAccount';

function AuthRoutes({
  setToken,
}: {
  setToken: Dispatch<SetStateAction<string>>;
}): ReactElement {
  const onAuth = (header: string) => {
    setToken(header);
  };
  return (
    <>
      <Layout>
        <Route exact path="/verify-account">
          <VerifyAccount onAuth={onAuth} />
        </Route>
        <Route exact path="/login">
          <Login onAuth={onAuth} />
        </Route>
      </Layout>
    </>
  );
}

function AdminApp(): ReactElement {
  return (
    <>
      <Sidebar />
      <Layout className={styles.main}>
        <Header />
        <Layout.Content className={styles.content}>
          <Switch>
            <Redirect exact path="/" to="/enterprise" />
            <Route exact path="/enterprise" component={EnterpriseAccounts} />
            <Route path="/enterprise/:domain" component={EnterpriseAccount} />
            <Route exact path="/config" component={DeveloperConfig} />
            <Route path="/config/:id" component={OauthClientConfig} />
          </Switch>
        </Layout.Content>
      </Layout>
    </>
  );
}

function App(): ReactElement {
  const [token, setToken] = useState(localStorage.getItem('adminJwt') || '');

  useEffect(() => {
    localStorage.setItem('adminJwt', token);
  }, [token]);

  return (
    <Switch>
      <Route exact path={['/login', '/verify-account']}>
        <AuthRoutes setToken={setToken} />
      </Route>

      <OssoProvider client={{ jwt: token }}>
        <Route component={AdminApp} />
      </OssoProvider>
    </Switch>
  );
}

export default App;
