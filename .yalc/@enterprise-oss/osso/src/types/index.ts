import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ReactElement } from 'react';

export enum Providers {
  Azure = 'AZURE',
  Okta = 'OKTA',
}

export interface OssoInputProps {
  id: string;
  label: string;
  value?: string;
  type: 'text' | 'textarea' | 'file';
  readOnly: boolean;
  copyable?: boolean;
  onChange?: (value: string) => void;
}

export interface OssoInput {
  name: string;
  inputProps: OssoInputProps;
}

export type ProviderMap<T extends string> = { [key in T]: OssoProvider };

type IdpGeneratedFieldKeys = 'metadataXml' | 'metadataUrl' | 'manual';

type IdpGeneratedFields<T extends IdpGeneratedFieldKeys> = {
  [key in T]?: OssoInputProps | OssoInput[];
};

export type OssoProvider = {
  value: Providers;
  label: string;
  ossoGeneratedFields: OssoInput[];
  idpGeneratedFields: IdpGeneratedFields<Partial<IdpGeneratedFieldKeys>>;
  serviceProviderMetadata: boolean;
};

export interface IdentityProvider {
  id: string;
  service: Providers;
  acsUrl?: string;
  [value: string]: string | Providers | undefined;
}

enum Status {
  new = 'new',
  active = 'ACTIVE',
}

export interface EnterpriseAccount {
  id?: string;
  key: string;
  name: string;
  domain: string;
  status: Status;
  identityProviders: IdentityProvider[];
}

export interface EnterpriseAccountData {
  enterpriseAccounts: EnterpriseAccount[];
}

export type IdentityProviderFormState = {
  service?: Providers;
  ssoUrl?: string;
  ssoCert?: string;
};

export type OssoClientOptions = {
  uri: string;
};

export type OssoContextValue = {
  client?: ApolloClient<NormalizedCacheObject>;
};

export type OssoProviderProps = {
  children: ReactElement;
  client?: OssoClientOptions;
};
