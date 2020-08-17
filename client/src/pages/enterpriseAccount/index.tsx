import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Card, Col, Row, Spin } from 'antd';
import React, { ReactElement } from 'react';

import AccountHeader from '~/client/src/components/AccountHeader';
import AccountIdentityProviders from '~/client/src/components/AccountIdentityProviders';

import styles from './index.module.css';
import { EnterpriseAccountPageProps } from './index.types';

export default function enterpriseAccount(
  props: EnterpriseAccountPageProps,
): ReactElement {
  const { data, loading } = useEnterpriseAccount(props.match.params.domain);

  return (
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <Card className={styles.card}>
          <AccountHeader enterpriseAccount={data?.enterpriseAccount} />
        </Card>
      </Col>
      <Col span={12}>
        <Card className={styles.card} bodyStyle={{ height: '100%' }}>
          {loading ? (
            <Spin />
          ) : (
            <AccountIdentityProviders
              onFinalize={(_identityProvider) => {
                console.log('on finalize');
              }}
              enterpriseAccount={data?.enterpriseAccount}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
}
