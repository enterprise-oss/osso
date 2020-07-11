import { Table } from 'antd';
import React from 'react';

export default function RecentLoginsTable() {
  const data = null;
  return (
    <div>
      <h1>Recent logins</h1>
      <Table rowKey="id" dataSource={data?.enterpriseAccounts}>
        <Table.Column title="Email" dataIndex="domain" key="domain" />
        <Table.Column title="Timestamp" dataIndex="domain" key="domain" />
      </Table>
    </div>
  );
}
