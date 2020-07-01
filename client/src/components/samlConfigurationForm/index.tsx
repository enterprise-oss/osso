import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Upload,
  Typography,
  Tooltip,
} from 'antd';
import IdpGeneratedFields from './idpGeneratedFields';
import { OssoGeneratedFields, OssoInputProps, useOssoFields, useIdentityProvider } from '@enterprise-oss/osso';

const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

const InputComponent = ({ label, copyable, ...inputProps }: OssoInputProps) => (
  <Form.Item label={label}>
    <Input
      {...inputProps}
      suffix={copyable && (
        <Tooltip title="Extra information">
          COPY
        </Tooltip>
      )
      }
    />
  </Form.Item>
);

const SamlConfigForm = ({ id }: { id: string }) => {
  const { loading, data } = useIdentityProvider(id);
  const { fieldsForProvider } = useOssoFields();

  if (loading) return null;
  const providerDetails = fieldsForProvider(data?.identityProvider?.service)

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      layout="vertical"
    >

      {providerDetails &&
        <OssoGeneratedFields
          InputComponent={InputComponent}
          providerDetails={providerDetails}
          identityProvider={data?.identityProvider}
        />
      }
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
