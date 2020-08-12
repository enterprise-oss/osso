import { PlusOutlined } from '@ant-design/icons';
import { addRedirectUris } from '@enterprise-oss/osso';
import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { ReactElement, useState } from 'react';

import styles from './index.module.css';

export default function RedirectUrisModal({
  oauthClientId,
  closeModal,
  open,
}: {
  oauthClientId: string;
  closeModal: () => void;
  open: boolean;
}): ReactElement {
  const [uriCount, setUriCount] = useState(1);
  const { addUris } = addRedirectUris();

  const [form] = useForm();
  return (
    <Modal
      width={640}
      title="New redirect"
      visible={open}
      onCancel={closeModal}
      destroyOnClose={true}
      footer={
        <div className={styles.buttonRow}>
          <Button
            onClick={() => {
              closeModal();
              form.resetFields();
              setUriCount(1);
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((uris) => {
                  addUris(Object.values(uris), oauthClientId);
                })
                .then(() => {
                  form.resetFields();
                  setUriCount(1);
                  closeModal();
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
    >
      <Form layout="vertical" form={form} hideRequiredMark={true}>
        {Array.from({ length: uriCount }).map((_, index) => (
          <Form.Item
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                type: 'url',
                message: 'Enter a valid URI with protocol',
              },
            ]}
            key={index}
            name={`uri-${index}`}
            label={`URI #${index + 1}`}
          >
            <Input />
          </Form.Item>
        ))}
        <Button
          type="ghost"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setUriCount((current) => current + 1)}
        />
      </Form>
    </Modal>
  );
}
