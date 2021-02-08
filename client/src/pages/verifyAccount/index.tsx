import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '~/client/src/resources/Logo.svg';

import { formItem, main, submitButton } from './styles.module.css';

export default function verifyAccountPage({
  onAuth,
}: {
  onAuth: Dispatch<SetStateAction<string>>;
}): ReactElement {
  const [form] = useForm();
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
    fetch('/verify-account', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({ ...values }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
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
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  useEffect(() => {
    const jsonNode = document.querySelector("script[type='application/json']");
    const jsonText = jsonNode.textContent;
    const jsonData = JSON.parse(jsonText);
    setEmail(jsonData.account.email);
    setKey(jsonData.session.verify_account_key);
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (!email) return null;

  return (
    <div className={main}>
      <Logo width={57} />
      <h1>Osso</h1>
      <p>To begin using Osso, please choose a password.</p>
      <Form
        form={form}
        style={{ width: '100%' }}
        hideRequiredMark
        layout="vertical"
        name="verify-account"
        initialValues={{
          remember: true,
          login: email,
          key,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="key" noStyle>
          <input value={key} type="hidden" />
        </Form.Item>

        <Form.Item label="Email" name="login" className={formItem}>
          <Input disabled readOnly size="large" value={email} />
        </Form.Item>

        <Form.Item
          className={formItem}
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" visibilityToggle={false} />
        </Form.Item>

        <Form.Item
          className={formItem}
          label="Confirm password"
          name="password-confirm"
          style={{ marginBottom: 32 }}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" visibilityToggle={false} />
        </Form.Item>

        <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
          <Button
            ghost
            htmlType="submit"
            size="large"
            block
            className={submitButton}
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
