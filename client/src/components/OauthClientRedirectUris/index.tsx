import { StarFilled } from '@ant-design/icons';
import { OauthClient, RedirectUri } from '@enterprise-oss/osso';
import {
  deleteRedirectUri,
  markRedirectUriPrimary,
} from '@enterprise-oss/osso';
import { Table, Tooltip } from 'antd';
import React, { ReactElement } from 'react';

import { blue } from '~/client/src/utils/colors';

export default function AccountIdentityProviders({
  oauthClient,
}: {
  oauthClient: OauthClient;
}): ReactElement {
  const sortedUris = [...oauthClient.redirectUris].sort((a, b) =>
    a.primary === b.primary ? 0 : a.primary ? -1 : 1,
  );

  const { deleteUri } = deleteRedirectUri();
  const { markPrimary } = markRedirectUriPrimary();

  return (
    <Table dataSource={sortedUris} pagination={false} rowKey="id">
      <Table.Column
        title="URI"
        dataIndex="uri"
        key="uri"
        render={(uri: string, { primary }: { primary: boolean }) => (
          <>
            {uri}{' '}
            {primary && (
              <Tooltip title="Primary">
                <StarFilled style={{ color: blue.primary, marginLeft: 6 }} />
              </Tooltip>
            )}
          </>
        )}
      />
      <Table.Column
        title="Actions"
        key="actions"
        align="right"
        render={(_value: never, redirectUri: RedirectUri) => (
          <>
            <a onClick={() => deleteUri(redirectUri.id)}>Delete</a>

            {!redirectUri.primary && (
              <>
                {' '}
                |{' '}
                <a onClick={() => markPrimary(redirectUri.id)}>Make Primary</a>
              </>
            )}
          </>
        )}
      />
    </Table>
  );
}
