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
// import Brand from './resources/brand.svg';

import DeveloperConfig from './pages/developerConfiguration/index';
import EnterpriseAccount from './pages/enterpriseAccount/index';
import EnterpriseAccounts from './pages/enterpriseAccounts/index';

function App() {
  const location = useLocation();
  console.log(location.pathname.split('/')[1]);
  return (<p>hey</p>

  );
}

export default App;
