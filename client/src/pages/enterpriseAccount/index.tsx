import React, { useState } from 'react';
import SamlConfigForm from '../../components/samlConfigurationForm/index';
import { useIdentityProvider, useEnterpriseAccount, EnterpriseAccount, useOssoFields } from '@enterprise-oss/osso'
import { InputProps } from './index.types';

import { Card, Button, Select } from 'antd';
const Option = Select.Option;

interface EnterpriseAccountProps {
  enterpriseAccount: EnterpriseAccount,
}

export default (props: InputProps) => {
  const { data, loading } = useEnterpriseAccount(props.match.params.domain);
  const { providers } = useOssoFields();
  const [provider, setProvider] = useState<string>();
  const { createProvider } = useIdentityProvider();

  if (loading) return <div>Loading</div>;
  const { enterpriseAccount } = data;

  const onCreate = () => {
    createProvider(
      enterpriseAccount?.id,
      provider
    )
  }

  return (
    <div>
      <Card title="Configure Identity Provider">
        <p>To add a new Identity provider for {enterpriseAccount?.name}, first choose the Identity Provider Service</p>
        <Select style={{ width: 120 }} onChange={(value) => setProvider(value as string)}>
          {Object.values(providers).map((provider) => (
            <Option value={provider.value}>{provider.label}</Option>
          ))}
        </Select>
        <Button onClick={onCreate}>Get Started</Button>
      </Card>


      {enterpriseAccount?.identityProviders?.map((provider) => (
        <Card key={provider.id}>
          {JSON.stringify(provider, null, 2)}
        </Card>
      ))}
    </div>
  )
}
