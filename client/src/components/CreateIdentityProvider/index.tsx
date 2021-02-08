import {
  createIdentityProvider,
  EnterpriseAccount,
  IdentityProvider,
  Providers,
  useOAuthClients,
  useOssoDocs,
  useOssoFields,
} from '@enterprise-oss/osso';
import { Button, Form, Modal, Select, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import React, { ReactElement, useEffect, useState } from 'react';

import ButtonComponent from '~/client/src/components/Osso/ButtonComponent';
import ProviderPicker from '~/client/src/components/ProviderPicker';

import {
  loaderContainer,
  loaderText,
  modalBody,
  modalHeader,
} from './index.module.css';

function ChooseProvider({
  service,
  form,
}: {
  service?: Providers;
  form: FormInstance<Record<string, string>>;
}): ReactElement {
  const { data } = useOAuthClients();

  return (
    <>
      <h2 className={modalHeader}>
        Which Identity Provider does the customer use?
      </h2>
      <Form form={form} layout="vertical" hideRequiredMark>
        <Form.Item
          name="service"
          valuePropName="provider"
          rules={[{ required: true, message: 'Select Provider' }]}
        >
          <ProviderPicker provider={service} />
        </Form.Item>
        <Form.Item
          label="OAuth client"
          name="oauthClientId"
          rules={[{ required: true, message: 'Select OAuth client' }]}
        >
          <Select id="oauthClientId">
            {data?.oauthClients.map((client) => (
              <Select.Option key={client.id} value={client.id}>
                {client.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
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
      <h2 className={modalHeader}>Custom PDF generated successfully!</h2>
      <p className={modalBody}>
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
    <div className={loaderContainer}>
      <Spin size="large" />
      <p className={loaderText}>Generating documentation...</p>
    </div>
  );
}

function ModalBody({
  step,
  identityProvider,
  form,
}: {
  step: FormSteps;
  service: Providers;
  setService: (service: Providers) => void;
  identityProvider: IdentityProvider;
  form: FormInstance<Record<string, string>>;
}): ReactElement {
  switch (step) {
    case FormSteps.PickProvider:
      return <ChooseProvider form={form} />;
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
  const [form] = Form.useForm();

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
    form.validateFields().then(() => {
      console.log(form.getFieldsValue());
      createProvider(
        enterpriseAccount.id,
        form.getFieldValue('oauthClientId'),
        form.getFieldValue('service'),
      ).then(() => {
        form.resetFields();
      });
    });
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
          <Button onClick={onSubmit} type="primary" loading={loading}>
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
      destroyOnClose={true}
      width={640}
      title="New Identity Provider"
      visible={open}
      onCancel={closeModal}
      footer={
        <>
          <DestructiveButton />
          <NextButton />
        </>
      }
    >
      <ModalBody
        form={form}
        step={step}
        identityProvider={identityProvider}
        service={service}
        setService={setService}
      />
    </Modal>
  );
}
