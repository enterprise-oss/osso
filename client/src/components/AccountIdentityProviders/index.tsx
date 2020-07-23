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
  const [currentProviderPage, setCurrentProviderPage] = useState(1);
  const carousel = useRef(null);

  useEffect(() => {
    carousel.current?.goTo(currentProviderPage - 1);
  }, [currentProviderPage, carousel]);

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
            onChange={(page) => setCurrentProviderPage(page)}
            current={currentProviderPage}
            total={identityProviders.length - 1}
          />
        </div>
        <div className={styles.carouselContainer}>
          {identityProviders?.length === 0 ? (
            <EmptyAccountIdentityProviders
              enterpriseAccount={enterpriseAccount}
              onAdd={() => setCreateModalOpen(true)}
            />
          ) : (
            <Carousel dots={false} className={styles.slickSlide} ref={carousel}>
              {[...identityProviders].sort(byStatus).map((idp) => (
                <div key={idp.id}>
                  <Card
                    className={styles.cardRoot}
                    size="small"
                    title={
                      <div className={styles.cardTitle}>
                        <p>{idp.service}</p>
                        <StatusTag identityProvider={idp} />
                      </div>
                    }
                  >
                    <div className={styles.cardBody}>
                      <StatusIcon
                        className={styles.icon}
                        identityProvider={idp}
                      />
                      <StatusCopy identityProvider={idp} />
                    </div>
                    <div className={styles.cardFooter}>
                      <StatusActions
                        identityProvider={idp}
                        onActions={[null, () => configure(idp)]}
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </Carousel>
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
