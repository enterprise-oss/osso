import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Button } from 'antd';
import React, { ReactElement } from 'react';

import styles from './index.module.css';
export default function EnterpriseHeader({
  enterpriseAccount,
  onAdd,
}: {
  enterpriseAccount: EnterpriseAccount;
  onAdd: () => void;
}): ReactElement {
  return (
    <div>
      <div className={styles.topRow}>
        <h1>Identity providers</h1>
        <Button onClick={onAdd} type="primary">
          Add New
        </Button>
      </div>
      {enterpriseAccount?.status}
    </div>
  );
}
