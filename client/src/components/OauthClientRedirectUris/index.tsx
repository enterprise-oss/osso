import { OauthClient } from '@enterprise-oss/osso';
import { Table } from 'antd';
import React, { ReactElement, useState } from 'react';

import styles from './index.module.css';

export default function AccountIdentityProviders({
  oauthClient,
}: {
  oauthClient: OauthClient;
}): ReactElement {
  // useEffect(() => {
  //   setCurrentProvider(identityProviders[0]);
  // }, [identityProviders.length]);

  return (
    <Table dataSource={oauthClient.redirectUris}>
      <Table.Column
        title="URI"
        dataIndex="uri"
        key="uri"
        render={(text: string, record: OauthClient) =>
          'https://foo.com/callback'
        }
      />{' '}
      <Table.Column
        title="Actions"
        key="actions"
        render={(text: string, record: OauthClient) =>
          'https://foo.com/callback'
        }
      />
    </Table>
  );
}
