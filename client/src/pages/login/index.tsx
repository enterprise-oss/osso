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

export default function login({
  onAuth,
}: {
  onAuth: Dispatch<SetStateAction<string>>;
}): ReactElement {
  const [form] = useForm();
  const [csrfToken, setCSRF] = useState('');
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
      console.log('token');

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

      // const form = document.createElement('form');
      // form.method = 'POST';
      // form.action = '/login';

      // for (const key in values) {
      //   if (values.hasOwnProperty(key)) {
      //     const hiddenField = document.createElement('input');
      //     hiddenField.type = 'hidden';
      //     hiddenField.name = key;
      //     hiddenField.value = values[key];

      //     form.appendChild(hiddenField);
      //   }
      // }

      // document.body.appendChild(form);
      // form.submit();
    });
  };

  useEffect(() => {
    const jsonNode = document.querySelector("script[type='application/json']");
    const jsonText = jsonNode.textContent;
    const jsonData = JSON.parse(jsonText);
    const regex = /(value)=["']?((?:.(?!["']?\+(?:\S+)=|\s*\/?[>"']))+.)["']?/g;
    const matches = regex.exec(jsonData?.csrfTag);
    setCSRF(matches[2]);
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
      <Form
        className={styles.form}
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
          _csrf: csrfToken,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <Form.Item name="_csrf" noStyle>
          <input value={csrfToken} type="hidden" name="_csrf" />
        </Form.Item> */}

        <Form.Item
          label="Email"
          name="login"
          className={styles.formItem}
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input size="large" name="login" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input.Password size="large" name="password" />
        </Form.Item>

        <Form.Item style={{ marginTop: 8 }}>
          <Button ghost htmlType="submit" size="large" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
