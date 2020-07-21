import { CopyOutlined } from '@ant-design/icons';
import { OssoInputProps } from '@enterprise-oss/osso';
import { Button, Tooltip } from 'antd';
import React, { ReactElement } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './index.module.css';

export default function CopyValueComponent({
  label,
  copyable,
  ...inputProps
}: OssoInputProps): ReactElement {
  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}:</label>
      <div className={styles.valueContainer}>
        <p className={styles.value}>{inputProps.value}</p>
        {copyable && (
          <CopyToClipboard
            text={inputProps.value}
            className={styles.copyContainer}
          >
            <Tooltip title="Copy to clipboard">
              <Button shape="circle" icon={<CopyOutlined />} type="ghost" />
            </Tooltip>
          </CopyToClipboard>
        )}
      </div>
    </div>
  );
}
