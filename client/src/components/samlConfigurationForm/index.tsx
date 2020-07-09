import React from 'react';
import { Form, Input, Button, Upload, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import {
  IdpGeneratedFields,
  OssoGeneratedFields,
  OssoInputProps,
} from '@enterprise-oss/osso';

const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

const UploadComponent = () => (
  <Upload.Dragger name="files" action="/upload.do">
    <p className="ant-upload-drag-icon">
      <UploadOutlined />
    </p>
    <p className="ant-upload-text">
      Click to choose or drag XML Federated Metadata file
    </p>
    <p className="ant-upload-hint">
      .XML files will be parsed for configuration
    </p>
  </Upload.Dragger>
);

const InputComponent = ({
  onChange,
  label,
  copyable,
  ...inputProps
}: OssoInputProps) => (
  <Form.Item label={label}>
    <Input
      onChange={(e) => onChange && onChange(e.target.value)}
      {...inputProps}
      suffix={
        copyable && (
          <Tooltip title="Extra information">
            <span>COPY</span>
          </Tooltip>
        )
      }
    />
  </Form.Item>
);

const SamlConfigForm = ({ id }: { id: string }) => (
  <Form {...formItemLayout} layout="vertical">
    <OssoGeneratedFields
      InputComponent={InputComponent}
      identityProvider={{ id }}
    />
    <IdpGeneratedFields
      ButtonComponent={(props) => (
        <Button {...props} type="primary" htmlType="submit">
          Submit
        </Button>
      )}
      InputComponent={InputComponent}
      UploadComponent={UploadComponent}
      identityProvider={{ id }}
    />
  </Form>
);

export default SamlConfigForm;
