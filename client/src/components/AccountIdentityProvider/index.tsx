import {
  DeleteOutlined,
  ExclamationCircleFilled,
  FilePdfFilled,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  deleteIdentityProvider,
  IdentityProvider,
  IdentityProviderStatus,
  OssoContext,
  useOssoDocs,
  useOssoFields,
} from '@enterprise-oss/osso';
import {
  Badge,
  Button,
  Card,
  Col,
  Grid,
  Popconfirm,
  Row,
  Spin,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import ConfigureIdentityProvider from '~/client/src/components/ConfigureIdentityProvider';
import { red } from '~/client/src/utils/colors';
import {
  backgroundColor,
  color,
  StatusCopy,
  StatusStringTag,
} from '~/client/src/utils/identityProviderStatus';

import {
  actionsList,
  avatarContainer,
  cardRoot,
  cardTitle,
  copyContainer,
  header,
  mainContainer,
  nameContainer,
  providerName,
  statusRow,
} from './index.module.css';

export default function AccountIdentityProviders({
  identityProvider,
}: {
  identityProvider: IdentityProvider;
}): ReactElement {
  const { currentUser } = useContext(OssoContext);
  const [modalOpen, setModalOpen] = useState(false);

  const { fieldsForProvider } = useOssoFields();
  const { downloadDocs, loading: docsLoading } = useOssoDocs(
    identityProvider.id,
  );
  const { deleteProvider } = deleteIdentityProvider(identityProvider.id);
  const providerDetails = fieldsForProvider(identityProvider.service);

  const { __typename, ...provider } = {
    ...providerDetails,
    ...identityProvider,
  };

  const tableData = provider.ossoGeneratedFields.manual.map((field) => ({
    key: field.inputProps.id,
    label: field.inputProps.label,
    value: provider[field.name],
  }));

  const { xl } = Grid.useBreakpoint();
  const [showDetails, setShowDetails] = useState(xl);

  useEffect(() => {
    setShowDetails(xl);
  }, [xl]);

  const mainActionButton = (status: IdentityProviderStatus) => {
    switch (status) {
      case IdentityProviderStatus.pending:
        return (
          <Button type="primary" onClick={() => setModalOpen(true)}>
            Complete Configuration
          </Button>
        );
      case IdentityProviderStatus.error:
        return (
          <Button type="primary" onClick={() => setModalOpen(true)}>
            Reconfigure
          </Button>
        );
      case IdentityProviderStatus.configured:
      case IdentityProviderStatus.active:
      default:
        return null;
    }
  };

  return (
    <>
      <Card
        className={cardRoot}
        bodyStyle={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
        headStyle={{
          padding: '0 16px 0 24px',
          backgroundColor: backgroundColor(identityProvider.status),
        }}
        title={
          <div className={header}>
            <div className={cardTitle}>
              <Badge
                style={{ height: '12px', width: '12px' }}
                dot={true}
                color={color(identityProvider.status).primary}
              >
                <div className={avatarContainer}>
                  <img src={provider.iconUrl} />
                </div>
              </Badge>
              <div className={nameContainer}>
                <span className={providerName}>{provider.label}</span>
                {currentUser.scope === 'admin' && (
                  <Tag>{provider.oauthClient.name}</Tag>
                )}
              </div>
            </div>
            {mainActionButton(identityProvider.status)}
          </div>
        }
      >
        <div>
          <Row gutter={[32, 0]}>
            <Col lg={24} xl={12}>
              <div className={mainContainer}>
                <div className={statusRow}>
                  <div>
                    <label className={statusRow}>Status: </label>
                    <StatusStringTag identityProvider={identityProvider} />
                  </div>
                </div>
                <div className={copyContainer}>
                  <StatusCopy identityProvider={identityProvider} />
                </div>
                <div>
                  <ul className={actionsList}>
                    <li>
                      <label className={statusRow}>Actions:</label>
                    </li>
                    <li>
                      <a onClick={downloadDocs}>
                        {docsLoading ? (
                          <Spin size="small" />
                        ) : (
                          <FilePdfFilled />
                        )}{' '}
                        Download setup PDF
                      </a>
                    </li>
                    <li>
                      <Popconfirm
                        icon={
                          <ExclamationCircleFilled style={{ color: red[5] }} />
                        }
                        title="Are you sure you’d like to delete this IDP?"
                        onConfirm={deleteProvider}
                        okText="Yes, delete"
                        cancelText="Cancel"
                        okButtonProps={{
                          danger: true,
                        }}
                      >
                        <a style={{ color: '#E52019' }}>
                          <DeleteOutlined /> Delete IDP
                        </a>
                      </Popconfirm>
                    </li>
                    <li>
                      <a onClick={() => setShowDetails((details) => !details)}>
                        {!xl &&
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
            <Col lg={24} xl={12}>
              {showDetails && (
                <>
                  <label
                    className={statusRow}
                    style={{ display: 'block', marginBottom: 16 }}
                  >
                    IDP configuration data:
                  </label>
                  <Table
                    showHeader={false}
                    pagination={false}
                    size="small"
                    columns={[
                      {
                        dataIndex: 'label',
                        key: 'field',
                      },
                      {
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
