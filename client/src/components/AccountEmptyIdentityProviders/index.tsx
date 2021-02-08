import { PlusCircleFilled } from '@ant-design/icons';
import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Avatar, Badge, Button, Card, Col, Row } from 'antd';
import React, { ReactElement } from 'react';

import {
  avatarContainer,
  cardRoot,
  cardTitle,
  copyContainer,
  header,
  label,
  mainContainer,
  providerName,
  status,
  statusRow,
} from './index.module.css';

export default function EmptyAccountIdentityProviders({
  enterpriseAccount,
  onAdd,
}: {
  enterpriseAccount: EnterpriseAccount;
  onAdd: () => void;
}): ReactElement {
  return (
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
        backgroundColor: '#F5F5F5',
      }}
      title={
        <div className={header}>
          <div className={cardTitle}>
            <Badge
              style={{ height: '12px', width: '12px' }}
              dot={true}
              color="#8C8C8C"
            >
              <Avatar
                className={avatarContainer}
                icon={<PlusCircleFilled style={{ color: '#8c8c8c' }} />}
                shape="square"
                size={64}
              />
            </Badge>
            <span className={providerName}>New Identity Provider</span>
          </div>
          <Button type="primary" onClick={onAdd}>
            Get Started
          </Button>
        </div>
      }
    >
      <div>
        <Row gutter={[32, 0]}>
          <Col span={24}>
            <div className={mainContainer}>
              <div className={statusRow}>
                <div>
                  <label className={label}>Status: </label>
                  <span className={status}>Awaiting setup</span>
                </div>
              </div>
              <div className={copyContainer}>
                Get started by adding a new Identity Provider (IDP) so that{' '}
                {enterpriseAccount.name} employees can start signing in.
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
