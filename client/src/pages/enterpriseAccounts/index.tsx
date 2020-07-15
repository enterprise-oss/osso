import { EnterpriseAccount, useEnterpriseAccounts } from '@enterprise-oss/osso';
import { Avatar, Table, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export default function enterpriseAccounts() {
  const { loading, data } = useEnterpriseAccounts();
  return (
    <Table loading={loading} rowKey="id" dataSource={data?.enterpriseAccounts}>
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(text: string, record: EnterpriseAccount) => (
          <>
            <Avatar src={`https://logo.clearbit.com/${record.domain}`} />
            <Link to={`/enterprise/${record.domain}`}>{text}</Link>
          </>
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
