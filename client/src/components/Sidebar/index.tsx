import { Layout } from 'antd';
import React, { ReactElement } from 'react';
const { Sider } = Layout;
import Menu from '~/client/src/components/Menu/index';
import LogoWhite from '~/client/src/resources/LogoWhite.svg';

import { brand, root } from './index.module.css';

export default function Sidebar(): ReactElement {
  return (
    <Sider width={220} className={root}>
      <div className={brand}>
        <LogoWhite />
        <h1>Osso</h1>
      </div>
      <Menu />
    </Sider>
  );
}
