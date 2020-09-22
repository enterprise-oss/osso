import { IdentityProvider } from '@enterprise-oss/osso';
import { Card } from 'antd';
import React, { ReactElement, useState } from 'react';

import ConfigureIdentityProvider from '~/client/src/components/ConfigureIdentityProvider';
import {
  StatusActions,
  StatusCopy,
  StatusIcon,
  StatusTag,
} from '~/client/src/utils/identityProviderStatus';

import styles from './index.module.css';

export default function AccountIdentityProviders({
  identityProvider,
}: {
  identityProvider: IdentityProvider;
}): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  const { __typename, ...provider } = identityProvider;

  return (
    <>
      <Card
        className={styles.cardRoot}
        bodyStyle={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
        headStyle={{ padding: '0 16px 0 24px' }}
        title={
          <div className={styles.cardTitle}>
            <p>{identityProvider.service}</p>
            <StatusTag identityProvider={identityProvider} />
          </div>
        }
      >
        <div className={styles.cardBody}>
          <StatusIcon
            className={styles.icon}
            identityProvider={identityProvider}
          />
          <StatusCopy identityProvider={identityProvider} />
        </div>
        <div className={styles.cardFooter}>
          <StatusActions
            identityProvider={identityProvider}
            onActions={[null, () => setModalOpen(true)]}
          />
        </div>
      </Card>
      <ConfigureIdentityProvider
        closeModal={() => setModalOpen(false)}
        open={modalOpen}
        identityProvider={provider}
      />
    </>
  );
}
