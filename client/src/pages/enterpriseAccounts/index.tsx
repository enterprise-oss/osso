import { EnterpriseAccount, useEnterpriseAccounts } from '@enterprise-oss/osso';
import { Table, Tag } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function enterpriseAccounts(): ReactElement {
  const { loading, data } = useEnterpriseAccounts({ limit: 1 });

  const accounts = data?.enterpriseAccounts?.edges.map((edge) => edge.node);
  // const hasNextPage = data?.enterpriseAccounts?.pageInfo?.hasNextPage;
  const total = data?.enterpriseAccounts?.totalCount;
  return (
    <Table
      pagination={{ pageSize: 1, total }}
      loading={loading}
      rowKey="id"
      dataSource={accounts}
    >
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(text: string, record: EnterpriseAccount) => (
          <Link to={`/enterprise/${record.domain}`}>{text}</Link>
        )}
      />
      <Table.Column title="Domain" dataIndex="domain" key="domain" />
      <Table.Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(status: string) => (
          <Tag color={status == 'active' ? 'green' : 'gold'}>
            {status.toUpperCase()}
          </Tag>
        )}
      />
    </Table>
  );
}
