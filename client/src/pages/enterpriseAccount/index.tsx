import './index.css';

import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Card, Col, Modal, Row } from 'antd';
import React, { useState } from 'react';

import AccountHeader from '~/client/src/components/AccountHeader';
import AccountIdentityProviders from '~/client/src/components/AccountIdentityProviders';
import RecentLoginsTable from '~/client/src/components/RecentLoginsTable';
import UsersTable from '~/client/src/components/UsersTable';

import { InputProps } from './index.types';

export default function enterpriseAccount(props: InputProps) {
  const { data } = useEnterpriseAccount(props.match.params.domain);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card className="card">
            <AccountHeader enterpriseAccount={data?.enterpriseAccount} />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="card">
            <UsersTable />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card className="card">
            <AccountIdentityProviders
              onAdd={() => setModalOpen(true)}
              enterpriseAccount={data?.enterpriseAccount}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="card">
            <RecentLoginsTable />
          </Card>
        </Col>
      </Row>
      <Modal
        title="New Identity Provider"
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
