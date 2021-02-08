import { LinkOutlined, PlusOutlined } from '@ant-design/icons';
import { createEnterpriseAccount } from '@enterprise-oss/osso';
import { Button, Form, Input, Modal } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { buttonRow, companyLogo, linkIcon } from './index.module.css';

export default function CreateAccountButton(): ReactElement {
  const { createAccount, loading } = createEnterpriseAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [domain, setDomain] = useState('');
  const [imageResult, setImageResult] = useState(true);
  const [debouncedDomain] = useDebounce(domain, 300);

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
        destroyOnClose={true}
        title="New Customer"
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        footer={
          <div className={buttonRow}>
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
                    className={companyLogo}
                    src={`https://logo.clearbit.com/${debouncedDomain}`}
                    onError={() => setImageResult(false)}
                  />
                ) : (
                  <LinkOutlined className={linkIcon} />
                )
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
