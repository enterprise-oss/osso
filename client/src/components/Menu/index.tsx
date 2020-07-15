import { SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function HorizontalRule() {
  const history = useHistory();
  const { pathname } = useLocation();

  const selectedKeys = pathname
    .split('/')
    .filter((key) => !['', 'admin'].includes(key));

  console.log(selectedKeys);
  return (
    <Menu
      mode="inline"
      theme="light"
      style={{ border: 'none' }}
      selectedKeys={selectedKeys}
      onClick={(e) => history.push(e.key as string)}
    >
      <Menu.Item key="enterprise" icon={<TeamOutlined />}>
        Customers
      </Menu.Item>
      <Menu.Item key="config" icon={<SettingOutlined />}>
        Developer
      </Menu.Item>
    </Menu>
  );
}
