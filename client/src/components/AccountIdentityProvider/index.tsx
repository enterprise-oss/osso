import { IdentityProvider, useOssoFields } from '@enterprise-oss/osso';
import { IdentityProviderStatus } from '@enterprise-oss/osso';
import { Button, Card, Col, Row, Table, Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { ReactElement, useState } from 'react';

import ConfigureIdentityProvider from '~/client/src/components/ConfigureIdentityProvider';
import {
  StatusActions,
  StatusCopy,
  StatusIcon,
  StatusStringTag,
  StatusTag,
} from '~/client/src/utils/identityProviderStatus';

import styles from './index.module.css';

export default function AccountIdentityProviders({
  identityProvider,
}: {
  identityProvider: IdentityProvider;
}): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);
  const { fieldsForProvider } = useOssoFields();

  const providerDetails = fieldsForProvider(identityProvider.service);

  const { __typename, ...provider } = {
    ...providerDetails,
    ...identityProvider,
  };

  const backgroundForStatus = {
    [IdentityProviderStatus.pending]: '#FEF3E8',
    [IdentityProviderStatus.configured]: '#F1F8F5',
    [IdentityProviderStatus.active]: '#F1F8F5',
    [IdentityProviderStatus.error]: '#FEF4F4',
  };

  const tableData = provider.ossoGeneratedFields.manual.map((field) => ({
    key: field.name,
    label: field.inputProps.label,
    value: provider[field.name],
  }));

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
        headStyle={{
          padding: '0 16px 0 24px',
          backgroundColor: backgroundForStatus[identityProvider.status],
        }}
        title={
          <div className={styles.cardTitle}>
            <div className={styles.avatarContainer}>
              <Avatar
                src={provider.icon}
                shape="square"
                className={styles.icon}
                size={28}
              />
            </div>
            <span>{provider.label}</span>
          </div>
        }
      >
        <div className={styles.cardBody}>
          <Row>
            <Col flex="1 0 302px">
              <div className={styles.mainContainer}>
                <div className={styles.statusRow}>
                  <label>
                    Status:{' '}
                    <StatusStringTag identityProvider={identityProvider} />
                  </label>
                  {identityProvider.status !==
                    IdentityProviderStatus.active && (
                    <Button size="small" type="primary">
                      Main Action
                    </Button>
                  )}
                </div>
                <div className={styles.copyContainer}>
                  <StatusCopy identityProvider={identityProvider} />
                </div>
                <div>
                  <label>Actions:</label>
                  <StatusActions
                    identityProvider={identityProvider}
                    onActions={[null, () => setModalOpen(true)]}
                  />
                </div>
              </div>
            </Col>
            <Col sm={0} lg={1} style={{ flex: 0 }}>
              <div className={styles.separator} />
            </Col>
            <Col flex="1 0 302px">
              <Table
                pagination={false}
                size="small"
                columns={[
                  {
                    title: 'Field',
                    dataIndex: 'label',
                    key: 'field',
                  },
                  {
                    title: 'Data',
                    dataIndex: 'value',
                    key: 'data',
                    ellipsis: {
                      showTitle: false,
                    },
                    // eslint-disable-next-line react/display-name
                    render: (value) => (
                      <Tooltip placement="topLeft" title={value}>
                        {value}
                      </Tooltip>
                    ),
                  },
                ]}
                dataSource={tableData}
              ></Table>
            </Col>
          </Row>
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
