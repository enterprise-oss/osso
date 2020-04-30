import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router basename="/admin">
        <Layout>
          <Layout.Content>
            <Switch>
              <Route path="/enterprise/:domain">
                <p>Hey domaidddddddsdsdsddsdsn</p>
              </Route>
              <Route path="/">
                <>
                  Home
                </>
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Router >
    )
  }
}

render(<App />, document.getElementById('root'));

