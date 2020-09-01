import { OauthClient, useOAuthClients } from '@enterprise-oss/osso';
import { Table } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function DeveloperConfig(): ReactElement {
  const { data, loading } = useOAuthClients();

  return (
    <Table
      loading={loading}
      rowKey="id"
      dataSource={data?.oauthClients}
      pagination={false}
    >
      <Table.Column
        title="OAuth Client"
        dataIndex="name"
        key="name"
        render={(text: string, record: OauthClient) => (
          <Link to={`/config/${record.id}`}>{text}</Link>
        )}
      />
    </Table>
  );
}
