import { OssoProvider, Providers } from '~/types';

export default {
  value: Providers.Azure,
  label: 'Azure',
  ossoGeneratedFields: [
    {
      name: 'acsUrl',
      inputProps: {
        id: 'osso-acs-url',
        label: 'Reply URL (Assertion Consumer Service URL)',
        type: 'text',
        readOnly: true,
        copyable: true,
      },
    },
    {
      name: 'id',
      inputProps: {
        id: 'osso-entity-id',
        label: 'Identifier (Entity ID)',
        type: 'text',
        readOnly: true,
        copyable: true,
      },
    },
  ],
  idpGeneratedFields: {
    metadataXml: {
      id: 'osso-azure-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    metadataUrl: {
      id: 'osso-azure-metadata-xml',
      label: 'Metadata Endpoint',
      type: 'text',
      readOnly: false,
      copyable: false,
    },
    manual: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-entity-id',
          label: 'SP Audience ID',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
    ],
  },
  serviceProviderMetadata: false,
} as OssoProvider;
