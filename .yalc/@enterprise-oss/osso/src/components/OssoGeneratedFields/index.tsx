import CSS from 'csstype';
import React, { ReactElement } from 'react';

import { useIdentityProvider, useOssoFields } from '~/hooks';

import { IdentityProvider, OssoInput, OssoInputProps } from './index.types';

export default function OssoGeneratedFields({
  identityProvider,
  InputComponent,
  containerStyle,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  InputComponent: React.FC<OssoInputProps>;
  containerStyle?: CSS.Properties;
}): ReactElement | null {
  const { loading, data } = useIdentityProvider(identityProvider.id);
  const { fieldsForProvider } = useOssoFields();
  if (loading || !data) return null;

  const providerDetails = fieldsForProvider(data.identityProvider.service);
  const fullIdentityProvider = Object.assign(identityProvider, data?.identityProvider);

  return (
    <div style={containerStyle}>
      {loading && <p>Loading</p>}
      {providerDetails?.ossoGeneratedFields.map((field: OssoInput) => (
        <InputComponent key={field.name} {...field.inputProps} value={fullIdentityProvider[field.name]} />
      ))}
    </div>
  );
}

const HTMLInputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} onChange={undefined} />
  </label>
);

OssoGeneratedFields.defaultProps = {
  InputComponent: HTMLInputComponent,
  containerStyle: undefined,
};
