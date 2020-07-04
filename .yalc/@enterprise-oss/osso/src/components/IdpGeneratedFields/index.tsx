import CSS from 'csstype';
import React, { ReactElement, useReducer } from 'react';

import { configureIdentityProvider, useIdentityProvider, useOssoFields } from '~/hooks';

import { IdentityProvider, IdentityProviderFormState, OssoInput, OssoInputProps, Providers } from './index.types';

const initialConfigState: IdentityProviderFormState = {
  service: undefined,
  ssoUrl: undefined,
  ssoCert: undefined,
};

type Action =
  | { field: keyof IdentityProviderFormState; value: string }
  | { field: 'service'; value: Providers }
  | { field: 'metadataXml'; value: string }
  | { field: 'metadataUrl'; value: string };

function configReducer(state: IdentityProviderFormState, action: Action): IdentityProviderFormState {
  switch (action.field) {
    case 'service':
      return { service: action.value as Providers };
    case 'ssoCert':
      return { ...state, ssoCert: action.value };
    case 'ssoUrl':
      return { ...state, ssoUrl: action.value };
    case 'metadataXml':
      // TODO: parse and return;
      return state;
    case 'metadataUrl':
      // TODO: fetch, parse and return;

      return state;
  }
}

export default function IdpGeneratedFields({
  identityProvider,
  InputComponent,
  UploadComponent,
  ButtonComponent,
  containerStyle,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  InputComponent: React.FC<OssoInputProps>;
  UploadComponent: React.FC<OssoInputProps>;
  ButtonComponent: React.FC<ButtonComponentProps>;
  containerStyle?: CSS.Properties;
}): ReactElement | null {
  const [state, dispatch] = useReducer(configReducer, initialConfigState);
  const { loading, data } = useIdentityProvider(identityProvider.id);
  const { fieldsForProvider } = useOssoFields();
  const { configureProvider } = configureIdentityProvider();

  if (loading || !data) return null;

  const providerDetails = fieldsForProvider(data.identityProvider.service);
  const { idpGeneratedFields } = providerDetails;
  const fullIdentityProvider = Object.assign(identityProvider, data?.identityProvider);

  return (
    <div style={containerStyle}>
      {loading && <p>Loading</p>}

      {idpGeneratedFields?.metadataXml && <UploadComponent {...(idpGeneratedFields?.metadataXml as OssoInputProps)} />}
      {idpGeneratedFields?.metadataUrl && <InputComponent {...(idpGeneratedFields?.metadataUrl as OssoInputProps)} />}

      {(idpGeneratedFields?.manual as OssoInput[]).map((field: OssoInput) => (
        <InputComponent
          key={field.name}
          onChange={(value) =>
            dispatch({
              field: field.name as keyof IdentityProviderFormState,
              value,
            })
          }
          {...field.inputProps}
          value={fullIdentityProvider[field.name]}
        />
      ))}
      <ButtonComponent onClick={() => configureProvider(fullIdentityProvider.id, state)}>Save</ButtonComponent>
    </div>
  );
}

type ButtonComponentProps = {
  children: ReactElement | string;
  onClick: () => void;
};

const HTMLButtonComponent = ({ children, onClick }: ButtonComponentProps) => (
  <button onClick={onClick}>{children}</button>
);

const HTMLInputComponent = ({ label, onChange, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} onChange={(event) => onChange && onChange(event.target.value)} />
  </label>
);

IdpGeneratedFields.defaultProps = {
  ButtonComponent: HTMLButtonComponent,
  InputComponent: HTMLInputComponent,
  UploadComponent: HTMLInputComponent,
  containerStyle: undefined,
};
