import { OssoInputProps } from '@enterprise-oss/osso';
import { Form, Input } from 'antd';
import React, { ReactElement } from 'react';

export default function InputComponent({
  copyable: _copyable,
  label,
  name,
  onChange,
  type,
  ...inputProps
}: OssoInputProps): ReactElement {
  const Component = type === 'textarea' ? Input.TextArea : Input;

  return (
    <Form.Item
      rules={[{ required: true, message: `Add an ${label}` }]}
      name={name}
      label={label}
    >
      <Component
        {...inputProps}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Form.Item>
  );
}
