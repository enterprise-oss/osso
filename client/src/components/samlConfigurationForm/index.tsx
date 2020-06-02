import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Upload,
  Typography,
} from 'antd';
import { SamlProvider, availableProviders, OssoInputProps } from '../../utils/@enterprise-oss/osso/index';
import OssoGeneratedFields from './ossoGeneratedFields';
import IdpGeneratedFields from './idpGeneratedFields';


const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

const SET_PROVIDER = gql`
  mutation SetProvider($id: ID!, $provider: IdentityProvider!) {
  setSamlProvider(input: {id: $id, provider: $provider}) {
    samlProvider {
      id
      provider
    }
  }
}
`

const SamlConfigForm = ({ samlProvider }: { samlProvider: SamlProvider }) => {
  const [setProvider] = useMutation(SET_PROVIDER);
  const provider = samlProvider?.provider && availableProviders[samlProvider.provider];

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="saml_config"
      {...formItemLayout}
      onFinish={onFinish}
      layout="vertical"
    >
      <Card title="1. Identity Provider">
        <Typography.Paragraph>
          Select the Identity Provider your customer will use for Single Sign On to
          your application.
        </Typography.Paragraph>
        <Form.Item>
          <Radio.Group
            onChange={(e) => setProvider({
              variables: {
                id: samlProvider.id,
                provider: e.target.value.value,
              }
            })}
            value={provider}
          >
            {Object.values(availableProviders).map((provider) => (
              <Radio key={provider.value} value={provider}>{provider.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Card>

      {provider && <OssoGeneratedFields provider={provider} samlProvider={samlProvider} />}
      {provider && <IdpGeneratedFields provider={provider} />}

      < Form.Item >
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form >
  );
};

export default SamlConfigForm;
