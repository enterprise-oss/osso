import { PlusCircleFilled } from '@ant-design/icons';
import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Button, Card } from 'antd';
import React, { ReactElement } from 'react';

import { blue } from '~/client/src/utils/colors';

import styles from './index.module.css';

export default function EmptyAccountIdentityProviders({
  enterpriseAccount,
  onAdd,
}: {
  enterpriseAccount: EnterpriseAccount;
  onAdd: () => void;
}): ReactElement {
  return (
    <>
      <Card className={styles.cardRoot} size="small">
        <div className={styles.cardBody}>
          <PlusCircleFilled
            className={styles.icon}
            style={{ color: blue.primary }}
          />
          <p>
            Start the onboarding process by adding the Identity Provider used by{' '}
            {enterpriseAccount.name}. You’ll also need to provide their
            preferred domain.
          </p>
        </div>
        <div className={styles.cardFooter}>
          <Button onClick={onAdd} type="primary">
            Add new Identity Provider
          </Button>
        </div>
      </Card>
    </>
  );
}
