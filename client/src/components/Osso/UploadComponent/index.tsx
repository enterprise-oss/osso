import { InboxOutlined } from '@ant-design/icons';
import { OssoInputProps } from '@enterprise-oss/osso';
import { Upload } from 'antd';
import React, { ReactElement } from 'react';

import { root } from './index.module.css';

export default function UploadComponent({
  label: _label,
  type: _type,
  onChange,
  ...inputProps
}: OssoInputProps): ReactElement {
  return (
    <div className={root}>
      <Upload.Dragger
        {...inputProps}
        beforeUpload={(file: File) => {
          const reader = new FileReader();
          reader.onload = function (event) {
            onChange(event.target.result as string);
          };
          reader.readAsText(file);
          return false;
        }}
        multiple={false}
        onRemove={() => {
          onChange('');
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click to choose or drag XML Federated Metadata file
        </p>
        <p className="ant-upload-hint">
          .XML files will be parsed for configuration
        </p>
      </Upload.Dragger>
    </div>
  );
}
