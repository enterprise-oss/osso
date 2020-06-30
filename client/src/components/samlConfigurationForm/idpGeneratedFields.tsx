import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Upload,
  Typography,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { OssoProviderDetails } from '@enterprise-oss/osso';


const normFile = (_state: any, e: any) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};


export default function IdpGeneratedFields({ provider }: { provider: OssoProviderDetails }) {

  return (
    <Card title="3. Complete Configuration">
      <Typography.Paragraph>
        Once your customer configures your application in their IDP, they'll
        need to return some data back to you to finalize configuration.
      </Typography.Paragraph>
      {provider.idpMetadata && (
        <>
          <Typography.Paragraph>
            {provider.label} supports Federation Metadata XML. If your customer
            returned an XML file to you, you can upload it here.
          </Typography.Paragraph>
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click to choose or drag XML Federated Metadata file</p>
              <p className="ant-upload-hint">.XML files will be parsed for configuration</p>
            </Upload.Dragger>
          </Form.Item>
          <Typography.Paragraph>
            If your customer returned a URL pointing to their metadata, you can enter it here.
          </Typography.Paragraph>
          <Form.Item label="Federated Metadata Endpoint">
            <Input name="metadataUrl" />
          </Form.Item>

          <Typography.Paragraph>
            {provider.label} also supports configuring the application manually. If your
            customer returned individual values for things like an x509 Certificate, then you
            should <a href="#">Configure Manually</a>.
          </Typography.Paragraph>
        </>
      )}
    </Card>
  )
}
