import { inviteAdminUser, useAdminUsers } from '@enterprise-oss/osso';
import { Button, Card, Form, Input, Modal, Select, Table } from 'antd';
import React, { ReactElement, useState } from 'react';

import styles from './index.module.css';

export default function TeamManagement(): ReactElement {
  const { data, loading } = useAdminUsers();
  const { inviteUser } = inviteAdminUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <Card>
      <div className={styles.cardTopRow}>
        <h2>Team</h2>
        <Button size="small" onClick={() => setModalOpen(true)}>
          Invite Teammate
        </Button>
      </div>
      <Table
        loading={loading}
        rowKey="id"
        dataSource={data?.adminUsers}
        className={styles.table}
      >
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column
          title="Last login"
          dataIndex="updatedAt"
          key="updatedAt"
        />
        <Table.Column title="Role" dataIndex="role" key="role" />
        <Table.Column title="Actions" dataIndex="domain" key="domain" />
      </Table>

      <Modal
        title="Invite teammate"
        onCancel={() => setModalOpen(false)}
        footer={
          <div className={styles.buttonRow}>
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
          </div>
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
              <Select.Option value="base">Base</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

{
  /* <Form.Item label="Open registration">
        <div className={styles.switchGroup}>
          <Input
            value="https://ossoapp.com/signup/035yu904whf08eh"
            style={{ width: '70%', borderRadius: '2px 0 0 2px' }}
            disabled={!registrationOpen}
            suffix={
              <CopyToClipboard
                onCopy={onCopy}
                text="https://ossoapp.com/signup/035yu904whf08eh"
                className={styles.copyContainer}
              >
                <Tooltip title="Copy to clipboard">
                  {copied ? <CheckOutlined /> : <CopyOutlined />}
                </Tooltip>
              </CopyToClipboard>
            }
          />
          <div className={styles.switchContainer}>
            <Switch
              checked={registrationOpen}
              onChange={(value) => setRegistrationOpen(value)}
            />
          </div>
        </div>
      </Form.Item>
      <p>
        Open registration allows anyone with this link to sign up. There is some
        security through obscurity, but we recommend turning this off once your
        initial set of team members registers.
      </p> */
}
