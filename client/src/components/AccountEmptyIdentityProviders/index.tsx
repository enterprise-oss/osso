import { PlusCircleFilled } from '@ant-design/icons';
import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Avatar, Badge, Button, Card, Col, Row } from 'antd';
import React, { ReactElement } from 'react';

import styles from './index.module.css';

export default function EmptyAccountIdentityProviders({
  enterpriseAccount,
  onAdd,
}: {
  enterpriseAccount: EnterpriseAccount;
  onAdd: () => void;
}): ReactElement {
  return (
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
        backgroundColor: '#F5F5F5',
      }}
      title={
        <div className={styles.header}>
          <div className={styles.cardTitle}>
            <Badge
              style={{ height: '12px', width: '12px' }}
              dot={true}
              color="#8C8C8C"
            >
              <Avatar
                className={styles.avatarContainer}
                icon={<PlusCircleFilled style={{ color: '#8c8c8c' }} />}
                shape="square"
                size={64}
              />
            </Badge>
            <span className={styles.providerName}>New Identity Provider</span>
          </div>
          <Button type="primary" onClick={onAdd}>
            Get Started
          </Button>
        </div>
      }
    >
      <div className={styles.cardBody}>
        <Row gutter={[32, 0]}>
          <Col span={24}>
            <div className={styles.mainContainer}>
              <div className={styles.statusRow}>
                <div>
                  <label className={styles.label}>Status: </label>
                  <span className={styles.status}>Awaiting setup</span>
                </div>
              </div>
              <div className={styles.copyContainer}>
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
