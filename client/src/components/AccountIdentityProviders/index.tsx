import { EnterpriseAccount, IdentityProvider } from '@enterprise-oss/osso';
import { Card, Carousel, Pagination } from 'antd';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

import ConfigureIdentityProvider from '~/client/src/components/ConfigureIdentityProvider';
import CreateIdentityProvider from '~/client/src/components/CreateIdentityProvider';
import EmptyAccountIdentityProviders from '~/client/src/components/EmptyAccountIdentityProviders';
import {
  byStatus,
  StatusActions,
  StatusCopy,
  StatusIcon,
  StatusTag,
} from '~/client/src/utils/identityProviderStatus';

import styles from './index.module.css';

export default function AccountIdentityProviders({
  enterpriseAccount,
  onFinalize: _onFinalize,
}: {
  enterpriseAccount: EnterpriseAccount;
  onFinalize: (identityProvider: IdentityProvider) => void;
}): ReactElement {
  const { identityProviders } = enterpriseAccount;
  const [currentProvider, setCurrentProvider] = useState(
    identityProviders?.[0],
  );

  // useEffect(() => {
  //   setCurrentProviderPage(identityProviders.length - 1);
  // }, [identityProviders.length]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdentityProvider, setEditingIdentityProvider] = useState<
    IdentityProvider
  >();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const configure = (identityProvider: IdentityProvider) => {
    const { __typename, ...editing } = identityProvider;
    setEditingIdentityProvider(editing);
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.topRow}>
          <h1>Identity providers</h1>
          <Pagination
            simple
            hideOnSinglePage={true}
            showQuickJumper={false}
            pageSize={1}
            onChange={(page) =>
              setCurrentProvider(identityProviders?.[page - 1])
            }
            current={identityProviders?.indexOf(currentProvider) + 1}
            total={identityProviders?.length}
          />
        </div>
        <div className={styles.carouselContainer}>
          {identityProviders?.length === 0 ? (
            <EmptyAccountIdentityProviders
              enterpriseAccount={enterpriseAccount}
              onAdd={() => setCreateModalOpen(true)}
            />
          ) : (
            <Card
              key={currentProvider.id}
              className={styles.cardRoot}
              bodyStyle={{
                padding: 24,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              headStyle={{ padding: '0 16px 0 24px' }}
              size="small"
              title={
                <div className={styles.cardTitle}>
                  <p>{currentProvider.service}</p>
                  <StatusTag identityProvider={currentProvider} />
                </div>
              }
            >
              <div className={styles.cardBody}>
                <StatusIcon
                  className={styles.icon}
                  identityProvider={currentProvider}
                />
                <StatusCopy identityProvider={currentProvider} />
              </div>
              <div className={styles.cardFooter}>
                <StatusActions
                  identityProvider={currentProvider}
                  onActions={[null, () => configure(currentProvider)]}
                />
              </div>
            </Card>
          )}
        </div>
      </div>
      <ConfigureIdentityProvider
        closeModal={() => setModalOpen(false)}
        open={modalOpen}
        identityProvider={editingIdentityProvider}
      />
      <CreateIdentityProvider
        closeModal={() => setCreateModalOpen(false)}
        enterpriseAccount={enterpriseAccount}
        open={createModalOpen}
      />
    </>
  );
}
