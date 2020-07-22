import { blue, gold, green } from '@ant-design/colors';
import {
  InfoCircleFilled,
  PlusCircleFilled,
  WarningFilled,
} from '@ant-design/icons';
import { EnterpriseAccount, IdentityProvider } from '@enterprise-oss/osso';
import { Button, Card, Pagination, Tag } from 'antd';
import React, { ReactElement, useState } from 'react';

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

export default function AccountIdentityProviders({
  enterpriseAccount,
  onFinalize,
}: {
  enterpriseAccount: EnterpriseAccount;
  onFinalize: (identityProvider: IdentityProvider) => void;
}): ReactElement {
  const { identityProviders } = enterpriseAccount;
  const [currentProviderPage, setCurrentProviderPage] = useState(1);

  console.log(identityProviders.length);
  // useEffect(() => {
  //   if (currentProviderIndex > identityProviders.length) {
  //     return setCurrentProviderIndex(0);
  //   }
  // }, [identityProviders, currentProviderIndex]);

  const currentProvider = identityProviders[currentProviderPage - 1];

  return (
    <div>
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
                used by {enterpriseAccount.name}. You’ll also need to provide
                their preferred domain.
              </p>
            </>
          }
          footer={<Button type="primary">Add new Identity Provider</Button>}
        />
      ) : (
        <IdentityProviderStatusCard
          identityProvider={currentProvider}
          body={
            <>
              {currentProvider.configured ? (
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
                {currentProvider.configured
                  ? 'This IDP is configured and ready for users to sign in. Once a user has signed in successfully, the status will change to Active.'
                  : 'Users from this IDP won’t be able to sign in until you or your customer finishes configuration.'}
              </p>
            </>
          }
          footer={
            !currentProvider.configured && (
              <>
                <Button>Download Setup</Button>
                <Button style={{ marginLeft: 15 }} type="primary">
                  Complete setup
                </Button>
              </>
            )
          }
        />
      )}
    </div>
  );
}
