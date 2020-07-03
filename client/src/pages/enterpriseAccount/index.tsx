import React, { useState } from 'react';
import SamlConfigForm from '../../components/samlConfigurationForm/index';
import {
  createIdentityProvider,
  useEnterpriseAccount,
  useOssoFields,
  IdentityProvider,
} from '@enterprise-oss/osso';
import { InputProps } from './index.types';

import { Card, Button, Select } from 'antd';

export default (props: InputProps) => {
  return null;
  // const Option = Select.Option;
  // const { data, loading } = useEnterpriseAccount(props.match.params.domain);
  // const { providers } = useOssoFields();
  // const [provider, setProvider] = useState<string>();
  // const { createProvider } = createIdentityProvider();

  // if (loading) return <div>Loading</div>;
  // const { enterpriseAccount } = data;

  // const onCreate = () => {
  //   createProvider(enterpriseAccount?.id, provider);
  // };

  // return (
  //   <div>
  //     {enterpriseAccount?.identityProviders?.map(
  //       (provider: IdentityProvider) => (
  //         <Card title={provider.service} key={provider.id}>
  //           <SamlConfigForm id={provider.id} />
  //         </Card>
  //       ),
  //     )}

  //     <Card title="Configure Identity Provider">
  //       <p>
  //         To add a new Identity provider for {enterpriseAccount?.name}, first
  //         choose the Identity Provider Service
  //       </p>
  //       <Select
  //         style={{ width: 120 }}
  //         onChange={(value) => setProvider(value as string)}
  //       >
  //         {Object.values(providers).map((provider) => (
  //           <Option value={provider.value}>{provider.label}</Option>
  //         ))}
  //       </Select>
  //       <Button onClick={onCreate}>Get Started</Button>
  //     </Card>
  //   </div>
  // );
};
