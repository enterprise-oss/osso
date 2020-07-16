import { PlusOutlined } from '@ant-design/icons';
import { createEnterpriseAccount } from '@enterprise-oss/osso';
import { Button, Form, Input, Modal } from 'antd';
import React, { ReactElement, useState } from 'react';

export default function CreateAccountButton(): ReactElement {
  const { createAccount, loading } = createEnterpriseAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Button
        id="addNew"
        type="primary"
        disabled={loading}
        onClick={() => setModalOpen(true)}
        icon={<PlusOutlined />}
      >
        Add New Customer
      </Button>
      <Modal
        title="New Enterprise Customer"
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          form
            .validateFields()
            .then(({ name, domain }) => {
              createAccount(name, domain);
              form.resetFields();
              setModalOpen(false);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        visible={modalOpen}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinishFailed={(e) => console.log(e)}
        >
          <Form.Item
            label="Domain"
            name="domain"
            rules={[{ required: true, message: 'Add a domain' }]}
          >
            <Input id="domain" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Add a name' }]}
          >
            <Input id="name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
