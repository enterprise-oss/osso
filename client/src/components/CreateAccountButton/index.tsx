import { LinkOutlined, PlusOutlined } from '@ant-design/icons';
import {
  createEnterpriseAccount,
  OssoContext,
  useOAuthClients,
} from '@enterprise-oss/osso';
import { Button, Form, Input, Modal, Select } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useDebounce } from 'use-debounce';

import styles from './index.module.css';

export default function CreateAccountButton(): ReactElement {
  const { createAccount, loading } = createEnterpriseAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [domain, setDomain] = useState('');
  const [imageResult, setImageResult] = useState(true);
  const [debouncedDomain] = useDebounce(domain, 300);

  const [form] = Form.useForm();
  const { data } = useOAuthClients();
  const { currentUser } = useContext(OssoContext);

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
        title="New Customer"
        onCancel={() => setModalOpen(false)}
        footer={
          <div className={styles.buttonRow}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              disabled={
                !form.isFieldsTouched(false) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
              type="primary"
              onClick={() => {
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
            label="Customer name"
            name="name"
            rules={[{ required: true, message: 'Add a name' }]}
          >
            <Input id="name" placeholder="Company" />
          </Form.Item>

          <Form.Item
            label="Customer domain"
            name="domain"
            rules={[{ required: true, message: 'Add a domain' }]}
          >
            <Input
              id="domain"
              onChange={(e) => {
                setDomain(e.target.value);
                setTimeout(() => setImageResult(true), 350);
              }}
              placeholder="example.com"
              prefix={
                debouncedDomain && imageResult ? (
                  <img
                    className={styles.companyLogo}
                    src={`https://logo.clearbit.com/${debouncedDomain}`}
                    onError={() => setImageResult(false)}
                  />
                ) : (
                  <LinkOutlined className={styles.linkIcon} />
                )
              }
            />
          </Form.Item>
          {currentUser?.scope === 'admin' && (
            <Form.Item
              label="OAuth client"
              name="oauth_client_id"
              rules={[{ required: true, message: 'Select OAuth client' }]}
            >
              <Select>
                {data?.oauthClients.map((client) => (
                  <Select.Option key={client.id} value={client.id}>
                    {client.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
}
