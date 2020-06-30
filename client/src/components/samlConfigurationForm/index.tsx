import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Upload,
  Typography,
} from 'antd';
import { SamlProvider } from '../../pages/enterpriseAccount/index';
import OssoGeneratedFields from './ossoGeneratedFields';
import IdpGeneratedFields from './idpGeneratedFields';
import { useOssoFields, useProvider } from '@enterprise-oss/osso';

const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};


const SamlConfigForm = ({ id }: { id: string }) => {
  const { identityProvider: { fetch, data, setProviderService } } = useProvider();
  useEffect(() => {
    fetch(id)
  }, [])

  const { providers, fieldsForProvider } = useOssoFields();
  const providerDetails = fieldsForProvider(data?.provider)
  if (!data) return null;
  console.log("PROVIDER", data)
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
          Select the Identity Provider service your customer will use for Single Sign On to
          your application.
        </Typography.Paragraph>
        <Form.Item>
          <Radio.Group
            onChange={(e) => setProviderService(
              data?.id,
              e.target.value,
            )}
            value={data?.provider}
          >
            {Object.values(providers).map((providerOption) => (
              <Radio key={providerOption.value} value={providerOption.value}>{providerOption.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Card>

      {providerDetails && <OssoGeneratedFields providerDetails={providerDetails} samlProvider={data} />}
      {providerDetails && <IdpGeneratedFields provider={providerDetails} />}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form >
  );
};

export default SamlConfigForm;
