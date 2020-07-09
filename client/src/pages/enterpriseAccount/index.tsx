import React, { useState } from 'react';
import SamlConfigForm from '../../components/samlConfigurationForm/index';
import {
  createIdentityProvider,
  useEnterpriseAccount,
  useOssoFields,
  IdentityProvider,
  Providers,
} from '@enterprise-oss/osso';
import { InputProps } from './index.types';

import { Card, Button, Select } from 'antd';
import { OssoProvider } from '@enterprise-oss/osso/dist/types';

export default (props: InputProps) => {
  const Option = Select.Option;
  const { data, loading } = useEnterpriseAccount(props.match.params.domain);
  const { providers } = useOssoFields();
  const [provider, setProvider] = useState<Providers>();
  const { createProvider } = createIdentityProvider();

  if (loading) return <div>Loading</div>;
  const { enterpriseAccount } = data;

  const onCreate = () => {
    createProvider(enterpriseAccount?.id, provider);
  };

  return (
    <div>
      {enterpriseAccount?.identityProviders?.map(
        (provider: IdentityProvider) => (
          <Card title={provider.service} key={provider.id}>
            <SamlConfigForm id={provider.id} />
          </Card>
        ),
      )}

      <Card title="Configure Identity Provider">
        <p>
          To add a new Identity provider for {enterpriseAccount?.name}, first
          choose the Identity Provider Service
        </p>
        <Select
          style={{ width: 120 }}
          onChange={(value) => setProvider(value as Providers)}
        >
          {(Object.values(providers) as OssoProvider[]).map((provider) => (
            <Option key={provider.value} value={provider.value}>
              {provider.label}
            </Option>
          ))}
        </Select>
        <Button onClick={onCreate}>Get Started</Button>
      </Card>
    </div>
  );
};
