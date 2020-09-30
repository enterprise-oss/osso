import { BankOutlined, LinkOutlined } from '@ant-design/icons';
import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Avatar, Card } from 'antd';
import React, { ReactElement } from 'react';

import Timestamp from '../Timestamp';
import styles from './index.module.css';

export default function CustomerHeader({
  enterpriseAccount,
}: {
  enterpriseAccount: EnterpriseAccount;
}): ReactElement {
  const companyAttrs = [
    {
      label: 'Added',
      value: (
        <Timestamp timestamp={enterpriseAccount?.createdAt} variant="month" />
      ),
    },
    {
      label: 'Users',
      value: enterpriseAccount?.usersCount,
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
            <span>
              <LinkOutlined />{' '}
              <a
                href={`https://${enterpriseAccount?.domain}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {enterpriseAccount?.domain}
              </a>
            </span>
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
