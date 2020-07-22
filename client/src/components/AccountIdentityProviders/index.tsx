import { blue, gold, green } from '@ant-design/colors';
import {
  InfoCircleFilled,
  PlusCircleFilled,
  WarningFilled,
} from '@ant-design/icons';
import { EnterpriseAccount, IdentityProvider } from '@enterprise-oss/osso';
import { Button, Card, Carousel, Pagination, Tag } from 'antd';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

import ConfigureIdentityProvider from '~/client/src/components/ConfigureIdentityProvider';

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
            <Tag color={identityProvider.configured ? 'green' : 'gold'}>
              {identityProvider.configured ? 'Active' : 'Pending'}
            </Tag>
          </div>
        )
      }
    >
      <div className={styles.cardBody}>{body}</div>
      <div className={styles.cardFooter}>{footer}</div>
    </Card>
  );
}

// TODO: pending should come first, but we dont currently have
// a status enum on the graphql type
// const order = ['error', 'pending', 'configured', 'active'];
// const statusComparator = ({ status: a }, { status: b }): number => {
//   if (a === b) return 0;
//   const aIdx = order.findIndex(a);
//   const bIdx = order.findIndex(b);
//   return aIdx < bIdx ? -1 : 1;
// };

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

  useEffect(() => {
    setCurrentProviderPage(identityProviders.length - 1);
  }, [identityProviders.length]);

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
              {identityProviders.map((idp) => (
                <div key={idp.id}>
                  <IdentityProviderStatusCard
                    identityProvider={idp}
                    body={
                      <>
                        {idp.configured ? (
                          <InfoCircleFilled
                            className={styles.icon}
                            style={{ color: green.primary }}
                          />
                        ) : (
                          <WarningFilled
                            className={styles.icon}
                            style={{ color: gold.primary }}
                          />
                        )}
                        <p>
                          {idp.configured
                            ? 'This IDP is configured and ready for users to sign in. Once a user has signed in successfully, the status will change to Active.'
                            : 'Users from this IDP won’t be able to sign in until you or your customer finishes configuration.'}
                        </p>
                      </>
                    }
                    footer={
                      !idp.configured && (
                        <>
                          <Button>Download Setup</Button>
                          <Button
                            onClick={() => configure(idp)}
                            style={{ marginLeft: 15 }}
                            type="primary"
                          >
                            Complete setup
                          </Button>
                        </>
                      )
                    }
                  />
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
