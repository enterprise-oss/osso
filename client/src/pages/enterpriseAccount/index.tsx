import { IdentityProvider, useEnterpriseAccount } from '@enterprise-oss/osso';
import { Card, Col, Row } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';

import AccountHeader from '~/client/src/components/AccountHeader';
import AccountIdentityProviders from '~/client/src/components/AccountIdentityProviders';
import IdentityProviderForm from '~/client/src/components/IdentityProviderForm';
import RecentLoginsTable from '~/client/src/components/RecentLoginsTable';
import UsersTable from '~/client/src/components/UsersTable';

import styles from './index.module.css';
import { InputProps } from './index.types';

export default function enterpriseAccount(props: InputProps): ReactElement {
  const { data } = useEnterpriseAccount(props.match.params.domain);
  const [modalOpen, setModalOpen] = useState(false);
  const [identityProvider, setIdentityProvider] = useState<IdentityProvider>();

  useEffect(() => {
    if (modalOpen) return;
    setTimeout(() => {
      setIdentityProvider(undefined);
    }, 500);
  }, [modalOpen]);

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
              onFinalize={(identityProvider) => {
                setIdentityProvider(identityProvider);
                setModalOpen(true);
              }}
              enterpriseAccount={data?.enterpriseAccount}
            />
            <IdentityProviderForm
              closeModal={() => setModalOpen(false)}
              enterpriseAccount={data?.enterpriseAccount}
              identityProvider={identityProvider}
              open={modalOpen}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className={styles.card}>
            <RecentLoginsTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
