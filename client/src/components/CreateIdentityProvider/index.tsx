import {
  createIdentityProvider,
  EnterpriseAccount,
  IdentityProvider,
  Providers,
  useOssoDocs,
  useOssoFields,
} from '@enterprise-oss/osso';
import { Button, Form, Modal, Spin } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';

import ButtonComponent from '~/client/src/components/Osso/ButtonComponent';
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
  const { fieldsForProvider } = useOssoFields();
  const { downloadDocs, loading: docsLoading } = useOssoDocs(
    identityProvider.id,
  );
  const fullProvider = fieldsForProvider(identityProvider.service);

  return (
    <>
      <h2 className={styles.modalHeader}>Custom PDF generated successfully!</h2>
      <p className={styles.modalBody}>
        The next step is to download and share this PDF with your customer so
        they can follow the instructions for configuring {fullProvider.label} on
        their end. Once that’s done, they’ll return some data to you to complete
        configuration.
      </p>
      <Form>
        <Form.Item label="Download">
          <ButtonComponent loading={docsLoading} onClick={downloadDocs}>
            <span>
              {fullProvider.label} setup - {identityProvider.domain}.pdf
            </span>
          </ButtonComponent>
        </Form.Item>
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
