import { PlusOutlined } from '@ant-design/icons';
import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Button, Card, Col, Row, Spin } from 'antd';
import React, { ReactElement, useState } from 'react';

import AccountEmptyIdentityProviders from '~/client/src/components/AccountEmptyIdentityProviders';
import AccountIdentityProvider from '~/client/src/components/AccountIdentityProvider';
import CreateIdentityProvider from '~/client/src/components/CreateIdentityProvider';
import CustomerHeader from '~/client/src/components/CustomerHeader';
import { byStatus } from '~/client/src/utils/identityProviderStatus';

import { EnterpriseAccountPageProps } from './index.types';

export default function enterpriseAccountPage(
  props: EnterpriseAccountPageProps,
): ReactElement {
  const { data, loading } = useEnterpriseAccount(props.match.params.domain);

  const [modalOpen, setModalOpen] = useState(false);

  const providers = [
    ...(data?.enterpriseAccount?.identityProviders ?? []),
  ].sort(byStatus);

  if (loading) return <Spin />;

  return (
    <>
      <CustomerHeader enterpriseAccount={data?.enterpriseAccount} />
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <h3>Identity providers</h3>
          <Button
            size="small"
            type="default"
            onClick={() => setModalOpen(true)}
          >
            <PlusOutlined /> Add new
          </Button>
        </div>
        {providers.length ? (
          providers.map((provider, index) => (
            <Row key={index}>
              <Col span={24}>
                <AccountIdentityProvider identityProvider={provider} />
              </Col>
            </Row>
          ))
        ) : (
          <AccountEmptyIdentityProviders
            enterpriseAccount={data?.enterpriseAccount}
            onAdd={() => setModalOpen(true)}
          />
        )}
      </Card>
      <CreateIdentityProvider
        closeModal={() => setModalOpen(false)}
        enterpriseAccount={data?.enterpriseAccount}
        open={modalOpen}
      />
    </>
  );
}
