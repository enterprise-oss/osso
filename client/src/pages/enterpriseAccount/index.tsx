import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Button, Card, Col, Modal, Row } from 'antd';
import React, { ReactElement, useState } from 'react';

import AccountHeader from '~/client/src/components/AccountHeader';
import AccountIdentityProviders from '~/client/src/components/AccountIdentityProviders';
import RecentLoginsTable from '~/client/src/components/RecentLoginsTable';
import UsersTable from '~/client/src/components/UsersTable';

import styles from './index.module.css';
import { InputProps } from './index.types';

export default function enterpriseAccount(props: InputProps): ReactElement {
  const { data } = useEnterpriseAccount(props.match.params.domain);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card className={styles.card}>
            <AccountHeader enterpriseAccount={data?.enterpriseAccount} />
          </Card>
        </Col>
        <Col span={12}>
          <Card className={styles.card}>
            <UsersTable />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card className={styles.card}>
            <AccountIdentityProviders
              onAdd={() => setModalOpen(true)}
              enterpriseAccount={data?.enterpriseAccount}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className={styles.card}>
            <RecentLoginsTable />
          </Card>
        </Col>
      </Row>
      <Modal
        width={640}
        title="New Identity Provider"
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={
          <div className={styles.buttonRow}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="primary" loading={false}>
              Done
            </Button>
          </div>
        }
      >
        <h2 className={styles.modalHeader}>
          1. Which Identity Provider does the customer use?
        </h2>
      </Modal>
    </>
  );
}
