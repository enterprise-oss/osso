import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Col, Row, Spin } from 'antd';
import React, { ReactElement, useState } from 'react';

import AccountIdentityProvider from '~/client/src/components/AccountIdentityProvider';
import CreateIdentityProvider from '~/client/src/components/CreateIdentityProvider';
import CustomerHeader from '~/client/src/components/CustomerHeader';
import EmptyAccountIdentityProviders from '~/client/src/components/EmptyAccountIdentityProviders';
import chunk from '~/client/src/utils/chunk';
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
        chunk(providers, 2).map((providerChunk, rowIndex) => (
          <Row key={`row-${rowIndex}`} gutter={[24, 24]}>
            {providerChunk.map((provider, colIndex) => (
              <Col key={`row-${rowIndex}-col-${colIndex}`} sm={24} lg={12}>
                <AccountIdentityProvider identityProvider={provider} />
              </Col>
            ))}
          </Row>
        ))
      )}
      <CreateIdentityProvider
        closeModal={() => setModalOpen(false)}
        enterpriseAccount={data?.enterpriseAccount}
        open={modalOpen}
      />
    </>
  );
}
