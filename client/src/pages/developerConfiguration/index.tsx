import { OauthClient, useOAuthClients } from '@enterprise-oss/osso';
import { Col, Row, Table } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import AppConfig from '~/client/src/components/AppConfig';

export default function DeveloperConfig(): ReactElement {
  const { data, loading } = useOAuthClients();

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
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
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <AppConfig />
        </Col>
      </Row>
    </>
  );
}
