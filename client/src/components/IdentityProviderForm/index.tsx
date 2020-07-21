import {
  configureIdentityProvider,
  createIdentityProvider,
  EnterpriseAccount,
  IdentityProvider,
  IdpGeneratedFields,
  OssoGeneratedFields,
  Providers,
} from '@enterprise-oss/osso';
import { Button, Form, Modal, Spin } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';

import CopyValueComponent from '~/client/src/components/Osso/CopyValueComponent';
import InputComponent from '~/client/src/components/Osso/InputComponent';
import LinkComponent from '~/client/src/components/Osso/LinkComponent';
import UploadComponent from '~/client/src/components/Osso/UploadComponent';
import ProviderPicker from '~/client/src/components/ProviderPicker';

import styles from './index.module.css';

function ChooseProvider({
  onChange,
  service,
}: {
  onChange: (Providers) => void;
  service?: Providers;
}): ReactElement {
  return (
    <>
      <h2 className={styles.modalHeader}>
        1. Which Identity Provider does the customer use?
      </h2>
      <ProviderPicker
        onChange={(service) => {
          onChange(service);
        }}
        provider={service}
      />
    </>
  );
}

function Documentation({
  identityProvider,
}: {
  identityProvider: IdentityProvider;
}): ReactElement {
  return (
    <>
      <h2 className={styles.modalHeader}>
        2. Here&apos;s the info they&apos;ll need to continue setup with{' '}
        {identityProvider?.service}:
      </h2>

      <OssoGeneratedFields
        LinkComponent={LinkComponent}
        InputComponent={CopyValueComponent}
        identityProvider={identityProvider}
      />
    </>
  );
}

function Loader(): ReactElement {
  return (
    <div className={styles.loaderContainer}>
      <Spin size="large" />
      <p className={styles.loaderText}>Generating documentation...</p>
    </div>
  );
}

enum FormSteps {
  PickProvider,
  Loading,
  Documentation,
  Finalize,
}

export default function IdentityProviderForm({
  closeModal,
  enterpriseAccount,
  identityProvider: existingProvider,
  open,
}: {
  closeModal: () => void;
  enterpriseAccount: EnterpriseAccount;
  identityProvider?: IdentityProvider;
  open: boolean;
}): ReactElement {
  const { createProvider, data, loading } = createIdentityProvider();
  const { configureProvider } = configureIdentityProvider();
  const [service, setService] = useState<Providers>();
  const [step, setStep] = useState<FormSteps>(FormSteps.PickProvider);

  const identityProvider =
    existingProvider || data?.createIdentityProvider?.identityProvider;

  useEffect(() => {
    if (loading) return setStep(FormSteps.Loading);
    if (!identityProvider?.id) return setStep(FormSteps.PickProvider);
    if (identityProvider.configured) return setStep(FormSteps.Finalize);
    if (identityProvider.service) return setStep(FormSteps.Documentation);

    return () => setStep(FormSteps.PickProvider);
  }, [identityProvider]);

  const onSubmit = () => {
    if (identityProvider?.id) {
      return closeModal();
    }
    createProvider(enterpriseAccount.id, service);
  };

  const [form] = Form.useForm();

  const modalBody = () => {
    switch (step) {
      case FormSteps.PickProvider:
        return <ChooseProvider onChange={setService} service={service} />;
      case FormSteps.Loading:
        return <Loader />;
      case FormSteps.Documentation:
        return <Documentation identityProvider={identityProvider} />;
      case FormSteps.Finalize:
        return (
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
            />
          </Form>
        );
    }
  };

  const DestructiveButton = () => {
    switch (step) {
      case FormSteps.PickProvider:
        return <Button onClick={closeModal}>Cancel</Button>;
      case FormSteps.Loading:
        return (
          <Button loading={true} onClick={closeModal}>
            Cancel
          </Button>
        );
      case FormSteps.Documentation:
        return (
          <Button onClick={() => setStep(FormSteps.PickProvider)}>Back</Button>
        );
      case FormSteps.Finalize:
        return <Button onClick={closeModal}>Cancel</Button>;
    }
  };

  const NextButton = () => {
    switch (step) {
      case FormSteps.PickProvider:
        return (
          <Button
            disabled={!service}
            onClick={onSubmit}
            type="primary"
            loading={loading}
          >
            Next
          </Button>
        );
      case FormSteps.Loading:
        return <Button loading={true}>Next</Button>;
      case FormSteps.Documentation:
        return (
          <Button onClick={() => setStep(FormSteps.Finalize)} type="primary">
            Next
          </Button>
        );
      case FormSteps.Finalize:
        return (
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((formState) => {
                  configureProvider(identityProvider?.id, formState);
                  closeModal();
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            Done
          </Button>
        );
    }
  };

  return (
    <Modal
      width={640}
      title="New Identity Provider"
      visible={open}
      onCancel={closeModal}
      footer={
        <div className={styles.buttonRow}>
          <DestructiveButton />
          <NextButton />
        </div>
      }
    >
      {modalBody()}
    </Modal>
  );
}
