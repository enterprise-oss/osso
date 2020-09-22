import {
  configureIdentityProvider,
  IdentityProvider,
  IdpGeneratedFields,
} from '@enterprise-oss/osso';
import { Button, Form, Modal } from 'antd';
import React, { ReactElement } from 'react';

import InputComponent from '~/client/src/components/Osso/InputComponent';
import UploadComponent from '~/client/src/components/Osso/UploadComponent';

import styles from './index.module.css';

export default function ConfigureIdentityProvider({
  closeModal,
  identityProvider,
  open,
}: {
  closeModal: () => void;
  identityProvider?: IdentityProvider;
  open: boolean;
}): ReactElement {
  const { configureProvider } = configureIdentityProvider();
  const [form] = Form.useForm();

  return (
    <Modal
      width={640}
      title="Complete setup"
      visible={open}
      onCancel={closeModal}
      footer={
        <div className={styles.buttonRow}>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((formState) =>
                  configureProvider(identityProvider?.id, formState),
                )
                .then(() => {
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
      <Form
        form={form}
        layout="vertical"
        onFinishFailed={(e) => console.log(e)}
        hideRequiredMark={true}
      >
        <IdpGeneratedFields
          onChange={(formState) => {
            form.setFieldsValue(formState);
          }}
          ButtonComponent={() => null}
          InputComponent={InputComponent}
          identityProvider={identityProvider}
          UploadComponent={UploadComponent}
          classes={{
            formInstructions: styles.ossoFormInstructions,
          }}
        />
      </Form>
    </Modal>
  );
}
