import { SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { OssoContext } from '@enterprise-oss/osso';
import { Menu as AntMenu } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Menu(): ReactElement {
  const { pathname } = useLocation();
  const { currentUser } = useContext(OssoContext);

  const selectedKeys = pathname
    .split('/')
    .filter((key) => !['', 'admin'].includes(key));

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
      {currentUser?.scope === 'admin' && (
        <AntMenu.Item key="config" icon={<SettingOutlined />}>
          <NavLink to="/config">Configuration</NavLink>
        </AntMenu.Item>
      )}
    </AntMenu>
  );
}
