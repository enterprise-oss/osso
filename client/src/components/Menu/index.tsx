import { SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu as AntMenu } from 'antd';
import React, { ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Menu(): ReactElement {
  const { pathname } = useLocation();

  const selectedKeys = pathname
    .split('/')
    .filter((key) => !['', 'admin'].includes(key));

  console.log(selectedKeys);
  return (
    <AntMenu
      mode="inline"
      theme="light"
      style={{ border: 'none' }}
      selectedKeys={selectedKeys}
    >
      <AntMenu.Item key="enterprise" icon={<TeamOutlined />}>
        <NavLink to="/enterprise">Customers</NavLink>
      </AntMenu.Item>
      <AntMenu.Item key="config" icon={<SettingOutlined />}>
        <NavLink to="/config">Developer</NavLink>
      </AntMenu.Item>
    </AntMenu>
  );
}
