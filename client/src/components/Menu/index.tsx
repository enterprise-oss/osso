import React from 'react';
import Customers from '~/client/src/resources/Customers.svg';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';

export default function HorizontalRule() {
  const history = useHistory();

  return (
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
  );
}
