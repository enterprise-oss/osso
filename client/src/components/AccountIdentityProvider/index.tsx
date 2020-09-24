import {
  DeleteOutlined,
  FilePdfFilled,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { IdentityProvider, useOssoFields } from '@enterprise-oss/osso';
import { IdentityProviderStatus } from '@enterprise-oss/osso';
import { Button, Card, Col, Row, Table, Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { ReactElement, useEffect, useState } from 'react';

import ConfigureIdentityProvider from '~/client/src/components/ConfigureIdentityProvider';
import {
  StatusCopy,
  StatusStringTag,
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
    [IdentityProviderStatus.configured]: '#EDEFF6',
    [IdentityProviderStatus.active]: '#F1F8F5',
    [IdentityProviderStatus.error]: '#FEF4F4',
  };

  const tableData = provider.ossoGeneratedFields.manual.map((field) => ({
    key: field.name,
    label: field.inputProps.label,
    value: provider[field.name],
  }));

  const { lg } = useBreakpoint();
  const [showDetails, setShowDetails] = useState(lg);

  useEffect(() => {
    setShowDetails(lg);
  }, [lg]);

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
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>
                      <a onClick={() => console.log('download')}>
                        <FilePdfFilled /> Download setup PDF
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: '#E52019' }}
                        onClick={() => console.log('delete')}
                      >
                        <DeleteOutlined /> Delete IDP
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setShowDetails((details) => !details)}>
                        {!lg &&
                          (showDetails ? (
                            <span>
                              <MinusOutlined /> Hide details
                            </span>
                          ) : (
                            <span>
                              <PlusOutlined /> Show details
                            </span>
                          ))}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col sm={0} lg={1} style={{ flex: 0 }}>
              <div className={styles.separator} />
            </Col>
            <Col flex="1 0 302px">
              {showDetails && (
                <>
                  <label style={{ marginBottom: 16 }}>Customer data:</label>
                  <Table
                    showHeader={false}
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
                  />
                </>
              )}
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
