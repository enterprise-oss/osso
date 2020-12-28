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

import styles from './styles.module.css';

export default function verifyAccountPage({
  onAuth,
}: {
  onAuth: Dispatch<SetStateAction<string>>;
}): ReactElement {
  const [form] = useForm();
  const [csrfToken, setCSRF] = useState('');
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
    const regex = /(value)=["']?((?:.(?!["']?\+(?:\S+)=|\s*\/?[>"']))+.)["']?/g;
    const matches = regex.exec(jsonData?.csrfTag);
    setCSRF(matches[2]);
    setEmail(jsonData.account.email);
    setKey(jsonData.session.verify_account_key);
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  console.log(csrfToken);
  if (!csrfToken) return null;
  return (
    <div className={styles.main}>
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
          _csrf: csrfToken,
          key,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="key" noStyle>
          <input value={key} type="hidden" />
        </Form.Item>

        <Form.Item label="Email" name="login" className={styles.formItem}>
          <Input disabled readOnly size="large" value={email} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Confirm password"
          name="password-confirm"
          style={{ marginBottom: 32 }}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <Button ghost htmlType="submit" size="large" block>
            Create account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
