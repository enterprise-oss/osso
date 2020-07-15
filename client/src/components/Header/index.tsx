import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Layout } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './index.module.css';

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const [headerState, setHeaderState] = useState({
    backPath: '/',
    Inner: null,
    nested: false,
  });

  useEffect(() => {
    const pathArray = location.pathname.split('/').filter(Boolean);
    const nested = pathArray.length > 1;

    setHeaderState({
      backPath: '/' + pathArray[0],
      Inner: <EnterpriseAccountName domain={pathArray[1]} />,
      nested,
    });
  }, [location.pathname]);

  const { nested, backPath, Inner } = headerState;

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <h1
          onClick={() => nested && history.push(backPath)}
          className={classnames(styles.breadcrumb, {
            [styles.breadcrumbRoot]: nested,
          })}
        >
          <ArrowLeftOutlined
            className={classnames(styles.back, { [styles.noBack]: !nested })}
          />
          Customers
        </h1>
        {nested && (
          <>
            <Separator />
            {Inner}
          </>
        )}
      </div>
    </Layout.Header>
  );
}

function Separator() {
  return <div className={styles.separator}></div>;
}

function EnterpriseAccountName({ domain }: { domain: string }) {
  const { data } = useEnterpriseAccount(domain);
  return (
    <span className={styles.breadcrumb}>{data?.enterpriseAccount?.name}</span>
  );
}
