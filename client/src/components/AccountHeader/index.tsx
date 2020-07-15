import { CalendarOutlined } from '@ant-design/icons';
import { EnterpriseAccount } from '@enterprise-oss/osso';
import { Avatar, Tag } from 'antd';
import React, { ReactElement } from 'react';

import Hr from '../Hr';
import styles from './index.module.css';

export default function EnterpriseHeader({
  enterpriseAccount,
}: {
  enterpriseAccount: EnterpriseAccount;
}): ReactElement {
  return (
    <div>
      <div className={styles.topRow}>
        <Avatar
          className={styles.avatar}
          src={`https://logo.clearbit.com/${enterpriseAccount?.domain}`}
        />
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{enterpriseAccount?.name}</h1>
            <Tag color="blue">Active</Tag>
          </div>
          <div>
            <CalendarOutlined />
            <span className={styles.since}>Since May 24, 2020</span>
          </div>
        </div>
      </div>
      <Hr />
      <div className={styles.description}>
        At the Facebook company, we are constantly iterating, solving problems
        and working together to connect people all over the world. That’s why
        it’s important that our workforce reflects the diversity of the people
        we serve. Hiring people with different backgrounds and points of view
        helps us make better decisions, build better products and create better
        experiences for everyone.
      </div>
    </div>
  );
}
