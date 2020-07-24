import { EnterpriseAccount, useEnterpriseAccounts } from '@enterprise-oss/osso';
import { Table, Tag } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 10;

export default function enterpriseAccounts(): ReactElement {
  const { loading, data, fetchMore } = useEnterpriseAccounts({
    limit: PAGE_SIZE,
  });

  const accounts = data?.enterpriseAccounts?.edges.map((edge) => edge.node);
  const total = data?.enterpriseAccounts?.totalCount;
  const pageInfo = data?.enterpriseAccounts?.pageInfo;

  const handlePagination = (_args: TablePaginationConfig) => {
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        ...(pageInfo.endCursor && { after: pageInfo.endCursor }),
      },
    });
  };

  return (
    <Table
      onChange={(pagination) => {
        if (pagination) {
          handlePagination(pagination);
        }
      }}
      pagination={{ pageSize: PAGE_SIZE, total }}
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
