import { useAppConfig } from '@enterprise-oss/osso';
import { Button, Card, Form, Input } from 'antd';
import React, { ReactElement } from 'react';

export default function AppConfig(): ReactElement {
  const { data, update } = useAppConfig();
  const [form] = Form.useForm();

  return (
    <Card>
      <h2>About your app</h2>
      <p>
        This information will be included in the Setup PDFs that are shared with
        your clients, so be sure to keep it up-to-date.
      </p>
      {data && (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ ...data?.appConfig }}
        >
          <Form.Item label="App name" name="name">
            <Input id="name" placeholder="SaaS App" />
          </Form.Item>
          <Form.Item label="App logo URL" name="logoUrl">
            <Input
              id="logoUrl"
              placeholder="https://image-host.com/your-logo.png"
            />
          </Form.Item>
          <Form.Item label="Contact email" name="contactEmail">
            <Input
              id="contactEmail"
              placeholder="customer.success@example.com"
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => {
              form.validateFields().then((values) => {
                update(values);
              });
            }}
          >
            Save
          </Button>
        </Form>
      )}
    </Card>
  );
}
