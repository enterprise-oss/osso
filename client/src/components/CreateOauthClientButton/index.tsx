import { PlusOutlined } from '@ant-design/icons';
import { createOauthClient } from '@enterprise-oss/osso';
import { Button, Form, Input, Modal } from 'antd';
import React, { ReactElement, useState } from 'react';

export default function CreateAccountButton(): ReactElement {
  const { createClient, loading } = createOauthClient();
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
        Add new client
      </Button>
      <Modal
        title="New Oauth Client"
        onCancel={() => setModalOpen(false)}
        footer={
          <div>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then(({ name }) => {
                    createClient(name);
                  })
                  .then(() => {
                    form.resetFields();
                    setModalOpen(false);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            >
              Done
            </Button>
          </div>
        }
        visible={modalOpen}
      >
        <Form
          form={form}
          layout="vertical"
          onFinishFailed={(e) => console.log(e)}
          hideRequiredMark={true}
        >
          <Form.Item
            label="Client name"
            name="name"
            rules={[{ required: true, message: 'Add a name' }]}
          >
            <Input
              id="client-name"
              placeholder="Amazing SAAS App - Production"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
