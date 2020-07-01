interface Provider {
  id: string,
  type: Providers,
  domain: string,
}

enum Providers {
  Azure = 'AZURE',
  Okta = 'OKTA',
}

interface OssoInputProps {
  label: string,
  value?: any,
  type: 'text' | 'file',
  readOnly: boolean,
  copyable?: boolean,
}

interface OssoInput {
  name: string,
  inputProps: OssoInputProps,
}

type OssoProvider = {
  value: Providers,
  label: string,
  ossoGeneratedFields: OssoInput[],
  idpGeneratedFields: OssoInput[],
  serviceProviderMetadata: Boolean,
  idpMetadata: Boolean,
}

type ProviderMap<T extends string> = { [key in T]: OssoProvider }

const availableProviders: ProviderMap<Providers> = {
  [Providers.Azure]: {
    value: Providers.Azure,
    label: 'Azure',
    ossoGeneratedFields: [
      {
        name: 'acsUrl',
        inputProps: {
          label: 'Reply URL (Assertion Consumer Service URL)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'id',
        inputProps: {
          label: 'Identifier (Entity ID)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
    ],
    idpGeneratedFields: [

    ],
    serviceProviderMetadata: false,
    idpMetadata: true,
  },

  [Providers.Okta]: {
    value: Providers.Okta,
    label: 'Okta',
    ossoGeneratedFields: [
      {
        name: 'acsUrl',
        inputProps: {
          label: 'Single Sign On URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'id',
        inputProps: {
          label: 'SP Audience ID',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
    ],
    serviceProviderMetadata: false,
    idpGeneratedFields: [

    ],
    idpMetadata: true,
  },
};

enum Status {
  new = 'new',
  active = 'active',
}


interface Enterprise {
  key: string,
  name: string,
  domain: string,
  status: Status,
  provider: any,
}

interface SamlProvider {
  id?: string,
  provider?: Providers,
  acsUrl?: string,
  [value: string]: string | Providers | undefined,
}

export {
  availableProviders,
  OssoInput,
  OssoInputProps,
  OssoProvider,
  Enterprise,
  SamlProvider,
};