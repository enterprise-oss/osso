import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '~/client/src/resources/Logo.svg';

import { formItem, formStyle, main, submitButton } from './styles.module.css';

export default function login({
  onAuth,
}: {
  onAuth: Dispatch<SetStateAction<string>>;
}): ReactElement {
  const [form] = useForm();
  const history = useHistory();

  const onFinish = (values) => {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(values),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 200) {
        const token = response.headers.get('Authorization');
        onAuth(token);
        return history.push('/enterprise');
      }

      if (response.status === 401) {
        form.setFields([
          {
            name: 'password',
            errors: ['Invalid email or password'],
          },
        ]);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={main}>
      <Logo width={57} />
      <h1>Osso</h1>
      <Form
        className={formStyle}
        form={form}
        method="post"
        id="login-form"
        style={{ width: '100%' }}
        hideRequiredMark
        layout="vertical"
        name="verify-account"
        initialValues={{
          remember: true,
          email: 'sam@enterpriseoss.dev',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="login"
          className={formItem}
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input size="large" name="login" id="login" />
        </Form.Item>

        <Form.Item
          className={formItem}
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input.Password
            size="large"
            name="password"
            id="password"
            placeholder="8 characters minimum"
            visibilityToggle={false}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
          <Button
            ghost
            htmlType="submit"
            size="large"
            block
            className={submitButton}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
