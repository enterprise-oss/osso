import { StarFilled } from '@ant-design/icons';
import { OauthClient } from '@enterprise-oss/osso';
import { Table, Tooltip } from 'antd';
import React, { ReactElement } from 'react';

import { blue } from '~/client/src/utils/colors';

export default function OauthClientRedirectUris({
  oauthClient,
}: {
  oauthClient: OauthClient;
}): ReactElement {
  const sortedUris = [...oauthClient.redirectUris].sort((a, b) =>
    a.primary === b.primary ? 0 : a.primary ? -1 : 1,
  );

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
    </Table>
  );
}
