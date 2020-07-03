import React from 'react';
import { Avatar, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useEnterpriseAccounts, EnterpriseAccount } from '@enterprise-oss/osso'

export default function () {
  const { loading, data } = useEnterpriseAccounts();
  return (
    <Table loading={loading} rowKey='id' dataSource={data?.enterpriseAccounts}>
      <Table.Column title="Name" dataIndex="name" key="name" render={
        (text: String, record: EnterpriseAccount) => (
          <>
            <Avatar src={`https://logo.clearbit.com/${record.domain}`} />
            <Link to={`/enterprise/${record.domain}`}>{text}</Link>
          </>
        )} />
      <Table.Column title="Domain" dataIndex="domain" key="domain" />
      <Table.Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(status: String) => (
          <Tag color={status == 'active' ? 'green' : 'gold'}>
            {status.toUpperCase()}
          </Tag>
        )}
      />
    </Table>
  );
}