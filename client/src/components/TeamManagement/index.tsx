import { inviteAdminUser, useAdminUsers } from '@enterprise-oss/osso';
import { Button, Card, Form, Input, Modal, Select, Table } from 'antd';
import React, { ReactElement, useState } from 'react';

import { cardTopRow, table } from './index.module.css';

export default function TeamManagement(): ReactElement {
  const { data, loading } = useAdminUsers();
  const { inviteUser } = inviteAdminUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <Card>
      <div className={cardTopRow}>
        <h2>Team</h2>
        <Button size="small" onClick={() => setModalOpen(true)}>
          Invite Teammate
        </Button>
      </div>
      <Table
        loading={loading}
        rowKey="id"
        dataSource={data?.adminUsers}
        className={table}
      >
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Role" dataIndex="role" key="role" />
      </Table>

      <Modal
        title="Invite teammate"
        onCancel={() => setModalOpen(false)}
        footer={
          <>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    console.log(values);
                    inviteUser(
                      values as {
                        email: string;
                        role: string;
                        oauthClientId?: string;
                      },
                    );
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
          </>
        }
        visible={modalOpen}
      >
        <Form
          form={form}
          layout="vertical"
          onFinishFailed={(e) => console.log(e)}
          hideRequiredMark={true}
          initialValues={{
            role: 'base',
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Add an email address' }]}
          >
            <Input id="email" placeholder="teammate@yourco.com" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Choose a role' }]}
          >
            <Select>
              <Select.Option value="base">Default</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
