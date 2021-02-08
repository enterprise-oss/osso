import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { OssoInputProps } from '@enterprise-oss/osso';
import { Form, Input, Tooltip } from 'antd';
import React, { ReactElement, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function CopyValueComponent({
  label,
  copyable,
  onChange: _onChange,
  ...inputProps
}: OssoInputProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <Form.Item label={label}>
      <Input
        {...inputProps}
        suffix={
          copyable && (
            <CopyToClipboard onCopy={onCopy} text={inputProps.value}>
              <Tooltip title="Copy to clipboard">
                {copied ? <CheckOutlined /> : <CopyOutlined />}
              </Tooltip>
            </CopyToClipboard>
          )
        }
      />
    </Form.Item>
  );
}
