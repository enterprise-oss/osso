import { EnterpriseAccount, IdentityProvider } from '@enterprise-oss/osso';
import { Card, Tag } from 'antd';
import React, { ReactElement } from 'react';

// TODO: this has a lot of inline styles since we aren't so settled on design
// import styles from './index.module.css';

export default function EnterpriseHeader({
  enterpriseAccount,
  onFinalize,
}: {
  enterpriseAccount: EnterpriseAccount;
  onFinalize: (identityProvider: IdentityProvider) => void;
}): ReactElement {
  return (
    <div>
      <h1>Identity providers</h1>

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
