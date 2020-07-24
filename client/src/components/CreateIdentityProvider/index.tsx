import {
  createIdentityProvider,
  EnterpriseAccount,
  IdentityProvider,
  OssoGeneratedFields,
  Providers,
} from '@enterprise-oss/osso';
import { Button, Form, Modal, Spin } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';

import CopyValueComponent from '~/client/src/components/Osso/CopyValueComponent';
import LinkComponent from '~/client/src/components/Osso/LinkComponent';
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
        Which Identity Provider does the customer use?
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
        Here&apos;s the info they&apos;ll need to continue setup with{' '}
        {identityProvider?.service}:
      </h2>
      <Form layout="vertical">
        <OssoGeneratedFields
          LinkComponent={LinkComponent}
          InputComponent={CopyValueComponent}
          identityProvider={identityProvider}
        />
      </Form>
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

function ModalBody({
  step,
  service,
  setService,
  identityProvider,
}: {
  step: FormSteps;
  service: Providers;
  setService: (service: Providers) => void;
  identityProvider: IdentityProvider;
}): ReactElement {
  switch (step) {
    case FormSteps.PickProvider:
      return <ChooseProvider onChange={setService} service={service} />;
    case FormSteps.Loading:
      return <Loader />;
    case FormSteps.Documentation:
      return <Documentation identityProvider={identityProvider} />;
  }
}

enum FormSteps {
  PickProvider,
  Loading,
  Documentation,
}

export default function IdentityProviderForm({
  closeModal,
  enterpriseAccount,
  open,
}: {
  closeModal: () => void;
  enterpriseAccount: EnterpriseAccount;
  identityProvider?: IdentityProvider;
  open: boolean;
}): ReactElement {
  const { createProvider, data, loading } = createIdentityProvider();
  const [service, setService] = useState<Providers>();
  const [step, setStep] = useState<FormSteps>(FormSteps.PickProvider);
  const identityProvider = data?.createIdentityProvider?.identityProvider;

  useEffect(() => {
    if (loading) return setStep(FormSteps.Loading);
    if (!identityProvider?.id) return setStep(FormSteps.PickProvider);
    if (identityProvider.service) return setStep(FormSteps.Documentation);

    return setStep(FormSteps.PickProvider);
  }, [identityProvider]);

  const onSubmit = () => {
    if (identityProvider?.id) {
      return closeModal();
    }
    createProvider(enterpriseAccount.id, service);
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
        return <>&nbsp;</>;
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
          <Button onClick={closeModal} type="primary">
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
      <ModalBody
        step={step}
        identityProvider={identityProvider}
        service={service}
        setService={setService}
      />
    </Modal>
  );
}
