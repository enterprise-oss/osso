import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEnterpriseAccount, useOAuthClient } from '@enterprise-oss/osso';
import { Layout } from 'antd';
import classnames from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CreateAccountButton from '~/client/src/components/CreateAccountButton';
import CreateOauthClientButton from '~/client/src/components/CreateOauthClientButton';
import EnterpriseAccountActions from '~/client/src/components/EnterpriseAccountActions';
import OauthClientActions from '~/client/src/components/OauthClientActions';

import {
  back,
  breadcrumb,
  breadcrumbRoot,
  breadcrumbs,
  header,
  noBack,
  separator,
} from './index.module.css';

export default function Header(): ReactElement {
  const location = useLocation();
  const history = useHistory();

  const [headerState, setHeaderState] = useState({
    backPath: '/',
    cta: null,
    Inner: null,
    nested: false,
    Outer: '',
  });

  const outerForPath = (pathElements) => {
    switch (pathElements[0]) {
      case 'enterprise':
        return 'Customers';
      case 'config':
        return 'Configuration';
    }
  };

  const innerForPath = (pathElements) => {
    if (pathElements.length === 1) return;

    switch (pathElements[0]) {
      case 'enterprise':
        return <EnterpriseAccountName domain={pathElements[1]} />;
      case 'config':
        return <OauthClientName id={pathElements[1]} />;
    }
  };

  const actionForPath = (pathElements) => {
    if (pathElements[0] == 'enterprise') {
      if (pathElements.length === 1) {
        return <CreateAccountButton />;
      }

      return <EnterpriseAccountActions domain={pathElements[1]} />;
    }

    if (pathElements[0] == 'config') {
      if (pathElements.length === 1) {
        return <CreateOauthClientButton />;
      }

      return <OauthClientActions id={pathElements[1]} />;
    }

    return null;
  };

  useEffect(() => {
    const pathArray = location.pathname.split('/').filter(Boolean);
    const nested = pathArray.length > 1;

    setHeaderState({
      backPath: '/' + pathArray[0],
      cta: actionForPath(pathArray),
      Inner: innerForPath(pathArray),
      nested,
      Outer: outerForPath(pathArray),
    });
  }, [location.pathname]);

  const { cta, nested, backPath, Inner, Outer } = headerState;

  return (
    <Layout.Header className={header}>
      <div className={breadcrumbs}>
        <h1
          onClick={() => nested && history.push(backPath)}
          className={classnames(breadcrumb, {
            [breadcrumbRoot]: nested,
          })}
        >
          <ArrowLeftOutlined
            className={classnames(back, { [noBack]: !nested })}
          />
          {Outer}
        </h1>
        {nested && (
          <>
            <Separator />
            {Inner}
          </>
        )}
      </div>
      {cta}
    </Layout.Header>
  );
}

function Separator() {
  return <div className={separator}></div>;
}

function EnterpriseAccountName({ domain }: { domain: string }) {
  const { data } = useEnterpriseAccount(domain);
  return <span className={breadcrumb}>{data?.enterpriseAccount?.name}</span>;
}

function OauthClientName({ id }: { id: string }) {
  const { data } = useOAuthClient(id);
  return <span className={breadcrumb}>{data?.oauthClient?.name}</span>;
}
