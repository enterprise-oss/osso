import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
} from 'antd';


const InputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <Form.Item label={label}>
    <Input {...inputProps} />
  </Form.Item>
);
import { OssoInput, OssoInputProps, OssoProviderDetails } from '@enterprise-oss/osso';
import { SamlProvider } from '../../pages/enterpriseAccount';

export default function OssoGeneratedFields({ providerDetails, samlProvider }: { providerDetails: OssoProviderDetails, samlProvider: SamlProvider }) {

  return (
    <Card title="2. Osso Generated">
      <Typography.Paragraph>
        Osso generates these values for you. Your enterprise customer needs
        them to set up your application in their identity provider. You can copy
        the values here, and they are also included in the documentation you can
        download below.
      </Typography.Paragraph>
      {providerDetails.ossoGeneratedFields.map((field: OssoInput) => (
        <InputComponent key={field.name} {...field.inputProps} value={samlProvider[field.name as keyof SamlProvider]} />
      ))}
      <Typography.Paragraph>
        Osso provides full documentation for your customer to set up your
        application in their IDP. These docs are specific to each of your
        customers.
      </Typography.Paragraph>
      <Button>Download Docs for this Enterprise</Button>

      {providerDetails.serviceProviderMetadata && (
        <>
          <Typography.Paragraph>
            {providerDetails.label} supports configuring an application with Service
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