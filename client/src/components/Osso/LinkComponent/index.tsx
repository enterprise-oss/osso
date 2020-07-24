import { DownloadOutlined } from '@ant-design/icons';
import { OssoLinkComponentProps } from '@enterprise-oss/osso';
import { Button } from 'antd';
import React, { ReactElement } from 'react';

import styles from './index.module.css';

export default function LinkComponent({
  children,
  label,
  href,
}: OssoLinkComponentProps): ReactElement {
  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}:</label>
      <Button
        type="ghost"
        target="_blank"
        href={href}
        icon={<DownloadOutlined />}
      >
        {children}
      </Button>
    </div>
  );
}
