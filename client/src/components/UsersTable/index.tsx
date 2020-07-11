import { Table } from 'antd';
import React from 'react';

export default function UsersTable() {
  const data = null;
  return (
    <div>
      <h1>Users</h1>
      <Table rowKey="id" dataSource={data?.enterpriseAccounts}>
        <Table.Column title="Email" dataIndex="domain" key="domain" />
        <Table.Column title="Last login" dataIndex="domain" key="domain" />
        <Table.Column title="Actions" dataIndex="domain" key="domain" />
      </Table>
    </div>
  );
}
