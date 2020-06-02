import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
} from 'antd';
import { SamlProvider, OssoInputProps, OssoProvider, OssoInput } from '../../utils/@enterprise-oss/osso/index';


const InputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <Form.Item label={label}>
    <Input {...inputProps} />
  </Form.Item>
);

export default function OssoGeneratedFields({ provider, samlProvider }: { provider: OssoProvider, samlProvider: SamlProvider }) {

  return (
    <Card title="2. Osso Generated">
      <Typography.Paragraph>
        Osso generates these values for you. Your enterprise customer needs
        them to set up your application in their identity provider. You can copy
        the values here, and they are also included in the documentation you can
        download below.
      </Typography.Paragraph>
      {provider.ossoGeneratedFields.map((field: OssoInput) => (
        <InputComponent key={field.name} {...field.inputProps} value={samlProvider[field.name]} />
      ))}
      <Typography.Paragraph>
        Osso provides full documentation for your customer to set up your
        application in their IDP. These docs are specific to each of your
        customers.
      </Typography.Paragraph>
      <Button>Download Docs for this Enterprise</Button>

      {provider.serviceProviderMetadata && (
        <>
          <Typography.Paragraph>
            {provider.label} supports configuring an application with Service
            Provider metadata. Osso generates this XML metadata file for you, which
            you can provide to your customer along with the documentation to allow
            them to set up your application more easily.
          </Typography.Paragraph>
          <Button>Download Docs for this Enterprise</Button>
        </>
      )}
    </Card>
  )
}