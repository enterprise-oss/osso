import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Card, Col, Row, Spin } from 'antd';
import React, { ReactElement, useState } from 'react';

import AccountIdentityProvider from '~/client/src/components/AccountIdentityProvider';
import CreateIdentityProvider from '~/client/src/components/CreateIdentityProvider';
import CustomerHeader from '~/client/src/components/CustomerHeader';
import EmptyAccountIdentityProviders from '~/client/src/components/EmptyAccountIdentityProviders';
import { byStatus } from '~/client/src/utils/identityProviderStatus';

import { EnterpriseAccountPageProps } from './index.types';

export default function enterpriseAccount(
  props: EnterpriseAccountPageProps,
): ReactElement {
  const { data, loading } = useEnterpriseAccount(props.match.params.domain);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <Spin />;

  const providers = [...data?.enterpriseAccount?.identityProviders].sort(
    byStatus,
  );

  return (
    <>
      <CustomerHeader enterpriseAccount={data?.enterpriseAccount} />
      {!providers.length ? (
        <Row gutter={[24, 24]}>
          <Col sm={24} lg={12}>
            <EmptyAccountIdentityProviders
              enterpriseAccount={data?.enterpriseAccount}
              onAdd={() => setModalOpen(true)}
            />
          </Col>
        </Row>
      ) : (
        <Card>
          <h3>Identity providers</h3>
          {providers.map((provider, index) => (
            <Row key={index}>
              <Col span={24}>
                <AccountIdentityProvider identityProvider={provider} />
              </Col>
            </Row>
          ))}
        </Card>
      )}
      <CreateIdentityProvider
        closeModal={() => setModalOpen(false)}
        enterpriseAccount={data?.enterpriseAccount}
        open={modalOpen}
      />
    </>
  );
}
