import { grey } from '@ant-design/colors';
import { SearchOutlined } from '@ant-design/icons';
import { EnterpriseAccount, useEnterpriseAccounts } from '@enterprise-oss/osso';
import { Input, Table } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce/lib';
const PAGE_SIZE = 10;

type SortOrder = 'ascend' | 'descend';

export default function enterpriseAccounts(): ReactElement {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
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

  useEffect(() => {
    refetch({
      first: PAGE_SIZE,
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  return (
    <>
      <Input
        style={{ width: 160, marginBottom: 24 }}
        onChange={({ target: { value } }) => setSearch(value)}
        placeholder="Search"
        prefix={<SearchOutlined style={{ color: grey[0] }} />}
        allowClear
      />
      <Table
        onChange={(
          pagination,
          _filters,
          { field, order }: SorterResult<EnterpriseAccount>,
        ) => {
          setSort([field as string, order]);
          setPage(pagination.current);
        }}
        pagination={{
          pageSize: PAGE_SIZE,
          total,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
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
          sorter={true}
          title="Users"
          dataIndex="usersCount"
          key="users"
        />
      </Table>
    </>
  );
}
