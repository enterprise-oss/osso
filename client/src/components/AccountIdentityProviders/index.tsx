import { PlusCircleFilled } from '@ant-design/icons';
import { EnterpriseAccount, IdentityProvider } from '@enterprise-oss/osso';
import { Button, Card, Carousel, Pagination } from 'antd';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

import ConfigureIdentityProvider from '~/client/src/components/ConfigureIdentityProvider';
import { blue } from '~/client/src/utils/colors';
import {
  byStatus,
  StatusActions,
  StatusCopy,
  StatusIcon,
  StatusTag,
} from '~/client/src/utils/identityProviderStatus';

import styles from './index.module.css';

function IdentityProviderStatusCard({
  body,
  identityProvider,
  footer,
}: {
  body: ReactElement;
  identityProvider?: IdentityProvider;
  footer: ReactElement;
}): ReactElement {
  return (
    <Card
      className={styles.cardRoot}
      size="small"
      title={
        identityProvider && (
          <div className={styles.cardTitle}>
            <p>{identityProvider.service}</p>
            <StatusTag identityProvider={identityProvider} />
          </div>
        )
      }
    >
      <div className={styles.cardBody}>{body}</div>
      <div className={styles.cardFooter}>{footer}</div>
    </Card>
  );
}

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
            defaultCurrent={0}
            total={identityProviders.length - 1}
          />
        </div>
        <div className={styles.carouselContainer}>
          {identityProviders?.length === 0 ? (
            <IdentityProviderStatusCard
              body={
                <>
                  <PlusCircleFilled
                    className={styles.icon}
                    style={{ color: blue.primary }}
                  />
                  <p>
                    Start the onboarding process by adding the Identity Provider
                    used by {enterpriseAccount.name}. You’ll also need to
                    provide their preferred domain.
                  </p>
                </>
              }
              footer={<Button type="primary">Add new Identity Provider</Button>}
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
                        onActions={[
                          () => console.log('a'),
                          () => configure(idp),
                        ]}
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
    </>
  );
}
