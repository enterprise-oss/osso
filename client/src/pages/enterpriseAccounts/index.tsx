import { EnterpriseAccount, useEnterpriseAccounts } from '@enterprise-oss/osso';
import { Table, Tag } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 10;

type SortOrder = 'ascend' | 'descend';

export default function enterpriseAccounts(): ReactElement {
  const { data, loading, fetchMore, refetch } = useEnterpriseAccounts({
    limit: PAGE_SIZE,
  });

  const accounts = data?.enterpriseAccounts?.edges.map((edge) => edge.node);
  const total = data?.enterpriseAccounts?.totalCount;
  const pageInfo = data?.enterpriseAccounts?.pageInfo;
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<[string, SortOrder]>(['name', 'ascend']);

  const handlePagination = () => {
    if (!data) return;

    fetchMore({
      variables: {
        first: PAGE_SIZE,
        ...(pageInfo.hasNextPage && { after: pageInfo.endCursor }),
        sortColumn: sort[0],
        sortOrder: sort[1],
      },
    });
  };

  useEffect(handlePagination, [page]);

  const handleSort = () => {
    if (!data) return;

    const [field, order] = sort;
    if (!field || !order) return;

    refetch({
      first: PAGE_SIZE,
      sortColumn: field as string,
      sortOrder: order,
    });
  };

  useEffect(handleSort, [sort[0], sort[1]]);

  return (
    <Table
      onChange={(
        pagination,
        _filters,
        { field, order }: SorterResult<EnterpriseAccount>,
      ) => {
        setSort([field as string, order]);
        setPage(pagination.current);
      }}
      pagination={{ pageSize: PAGE_SIZE, total }}
      loading={loading}
      rowKey="id"
      dataSource={accounts}
    >
      <Table.Column
        title="Name"
        dataIndex="name"
        sorter={true}
        defaultSortOrder="ascend"
        key="name"
        render={(text: string, record: EnterpriseAccount) => (
          <Link to={`/enterprise/${record.domain}`}>{text}</Link>
        )}
      />
      <Table.Column
        sorter={true}
        title="Domain"
        dataIndex="domain"
        key="domain"
      />
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
