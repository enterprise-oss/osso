import { EnterpriseAccount, IdentityProvider } from '@enterprise-oss/osso';
import { Button, Card, Tag } from 'antd';
import React, { ReactElement } from 'react';

import styles from './index.module.css';

// TODO: this has a lot of inline styles since we aren't so settled on design

export default function EnterpriseHeader({
  enterpriseAccount,
  onAdd,
  onFinalize,
}: {
  enterpriseAccount: EnterpriseAccount;
  onAdd: () => void;
  onFinalize: (identityProvider: IdentityProvider) => void;
}): ReactElement {
  return (
    <div>
      <div className={styles.topRow}>
        <h1>Identity providers</h1>
        <Button onClick={onAdd} type="primary">
          Add New
        </Button>
      </div>
      {enterpriseAccount?.identityProviders?.map((idp) => (
        <Card
          style={{ marginBottom: 24 }}
          onClick={() => {
            const { __typename, ...attrs } = idp;
            onFinalize(attrs);
          }}
          key={idp.id}
          title={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p>{idp.service}</p>
              <Tag color={idp.configured ? 'green' : 'gold'}>
                {idp.configured ? 'Active' : 'Pending'}
              </Tag>
            </div>
          }
          size="small"
        ></Card>
      ))}
    </div>
  );
}
