import { BankOutlined, LinkOutlined } from '@ant-design/icons';
import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Avatar, Card } from 'antd';
import React, { ReactElement } from 'react';

import styles from './index.module.css';

export default function CustomerHeader({
  enterpriseAccount,
}: {
  enterpriseAccount: EnterpriseAccount;
}): ReactElement {
  const companyAttrs = [
    {
      label: 'Added',
      value: '05/2020',
    },
    {
      label: 'Users',
      value: 200,
    },
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.root}>
        <div className={styles.leftContainer}>
          <Avatar
            size={64}
            icon={<BankOutlined />}
            shape="square"
            className={styles.avatar}
            src={`https://logo.clearbit.com/${enterpriseAccount?.domain}`}
          />
          <div className={styles.nameContainer}>
            <h1 className={styles.name}>{enterpriseAccount?.name}</h1>
            <p>
              <LinkOutlined />{' '}
              <a
                href={`https://${enterpriseAccount.domain}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {enterpriseAccount.domain}
              </a>
            </p>
          </div>
        </div>
        <div className={styles.companyAttributes}>
          {companyAttrs.map(({ value, label }) => (
            <div key={label} className={styles.companyAttribute}>
              <h4>{value}</h4>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
