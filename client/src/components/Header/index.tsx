import React from 'react';
import { Layout } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useEnterpriseAccount } from '@enterprise-oss/osso';
import styles from './index.module.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { InputProps } from 'src/pages/enterpriseAccount/index.types';

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const pathArray = location.pathname.split('/').filter(Boolean);
  const nested = pathArray.length > 1;

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <span
          onClick={() => nested && history.push(`/${pathArray[0]}`)}
          className={classnames(styles.breadcrumb, {
            [styles.breadcrumbRoot]: nested,
          })}
        >
          <ArrowLeftOutlined
            className={classnames(styles.back, { [styles.noBack]: !nested })}
          />
          Customers
        </span>
        {nested && (
          <>
            <Separator />
            <EnterpriseAccountName domain={pathArray[1]} />
          </>
        )}
      </div>
    </Layout.Header>
  );
}

function Separator() {
  return <div className={styles.separator}></div>;
}

function EnterpriseAccountName(props: InputProps) {
  const { data } = useEnterpriseAccount(props.match.params.domain);
  return (
    <span className={styles.breadcrumb}>{data?.enterpriseAccount?.name}</span>
  );
}
