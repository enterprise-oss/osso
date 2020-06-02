
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Avatar, Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';

enum Status {
  new = 'new',
  active = 'ACTIVE',
}

interface Enterprise {
  key: string,
  name: string,
  domain: string,
  status: Status,
}

const ACCOUNTS_QUERY = gql`
  {
    enterpriseAccounts {
      id
      domain
      name
      status
    }
  }
`;

export default function() {
  const { loading, error, data } = useQuery(ACCOUNTS_QUERY);

  return (
    <Table rowKey='id' dataSource={data?.enterpriseAccounts}>
      <Table.Column title="Name" dataIndex="name" key="name" render={
        (text: String, record: Enterprise) => (
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