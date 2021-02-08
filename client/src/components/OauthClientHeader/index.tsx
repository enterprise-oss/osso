import { CalendarOutlined } from '@ant-design/icons';
import { OauthClient } from '@enterprise-oss/osso';
import { useOAuthClient } from '@enterprise-oss/osso';
import { Button, Form } from 'antd';
import React, { ReactElement } from 'react';

import Hr from '~/client/src/components/Hr';
import CopyValueComponent from '~/client/src/components/Osso/CopyValueComponent';
import Timestamp from '~/client/src/components/Timestamp';

import { info, name, nameRow, since, topRow } from './index.module.css';

export default function OauthClientHeader({
  oauthClient,
}: {
  oauthClient: OauthClient;
}): ReactElement {
  const { regenerateCredentials } = useOAuthClient(oauthClient.id);
  return (
    <div>
      <div className={topRow}>
        <div className={info}>
          <div className={nameRow}>
            <h1 className={name}>{oauthClient?.name}</h1>
          </div>
          <div>
            <CalendarOutlined />
            <span className={since}>
              Created <Timestamp timestamp={oauthClient.createdAt} />
            </span>
          </div>
        </div>
        <Button size="small" onClick={regenerateCredentials}>
          Regenerate Credentials
        </Button>
      </div>
      <Hr style={{ margin: '24px 0' }} />
      <Form layout="vertical">
        <CopyValueComponent
          id="osso-client-id"
          copyable={true}
          readOnly={true}
          label="Client ID"
          value={oauthClient.clientId}
          type="text"
        />
        <CopyValueComponent
          id="osso-client-secret"
          copyable={true}
          readOnly={true}
          label="Client secret"
          value={oauthClient.clientSecret}
          type="text"
        />
      </Form>
    </div>
  );
}
