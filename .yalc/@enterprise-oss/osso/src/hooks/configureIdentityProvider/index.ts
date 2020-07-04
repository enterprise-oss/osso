import { ApolloError, gql, useMutation } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { IdentityProvider, IdentityProviderFormState } from './index.types';

const CONFIGURE_PROVIDER = gql`
  mutation ConfigureIdentityProvider($input: ConfigureIdentityProviderInput!) {
    configureIdentityProvider(input: $input) {
      identityProvider {
        id
        domain
        enterpriseAccountId
        service
        acsUrl
        ssoCert
        ssoUrl
      }
    }
  }
`;

const configureIdentityProvider = (): {
  configureProvider: (id: string, providerData: IdentityProviderFormState) => void;
  data?: IdentityProvider;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('configureIdentityProvider must be used inside an OssoProvider');
  }

  const [configureProvider, { data, loading, error }] = useMutation(CONFIGURE_PROVIDER, {
    client,
  });

  return {
    configureProvider: (id, configData) => configureProvider({ variables: { input: { id, ...configData } } }),
    data,
    loading,
    error,
  };
};

export default configureIdentityProvider;
