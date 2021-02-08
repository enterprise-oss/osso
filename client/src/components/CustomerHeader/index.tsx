import { BankOutlined, LinkOutlined } from '@ant-design/icons';
import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Avatar, Card } from 'antd';
import React, { ReactElement } from 'react';

import Timestamp from '../Timestamp';
import {
  avatar,
  card,
  companyAttribute,
  companyAttributes,
  leftContainer,
  name,
  nameContainer,
  root,
} from './index.module.css';

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
    <Card className={card}>
      <div className={root}>
        <div className={leftContainer}>
          <Avatar
            size={64}
            icon={<BankOutlined />}
            shape="square"
            className={avatar}
            src={`https://logo.clearbit.com/${enterpriseAccount?.domain}`}
          />
          <div className={nameContainer}>
            <h1 className={name}>{enterpriseAccount?.name}</h1>
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
        <div className={companyAttributes}>
          {companyAttrs.map(({ value, label }) => (
            <div key={label} className={companyAttribute}>
              <h4>{value}</h4>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
