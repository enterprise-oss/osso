import { ApolloError, gql, useMutation } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';
import { ACCOUNT_QUERY } from '~/hooks/useEnterpriseAccount/index';

import { EnterpriseAccount, Providers } from './index.types';

const CREATE_PROVIDER = gql`
  mutation CreateIdentityProvider($input: CreateIdentityProviderInput!) {
    createIdentityProvider(input: $input) {
      identityProvider {
        id
        domain
        enterpriseAccountId
        service
        acsUrl
      }
    }
  }
`;

const createIdentityProvider = (): {
  createProvider: (enterpriseAccountId: string, providerService: Providers) => void;
  data?: EnterpriseAccount[];
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('createIdentityProvider must be used inside an OssoProvider');
  }

  const [createProvider, { data, loading, error }] = useMutation(CREATE_PROVIDER, {
    client,
    update(
      cache,
      {
        data: {
          createIdentityProvider: { identityProvider },
        },
      },
    ) {
      const data: { enterpriseAccount: EnterpriseAccount } | null = cache.readQuery({
        query: ACCOUNT_QUERY,
        variables: { domain: identityProvider.domain },
      });

      const enterpriseAccount = data?.enterpriseAccount;

      if (!enterpriseAccount) return;

      cache.writeQuery({
        query: ACCOUNT_QUERY,
        variables: { domain: identityProvider.domain },
        data: {
          enterpriseAccount: {
            ...enterpriseAccount,
            identityProviders: [...enterpriseAccount.identityProviders, identityProvider],
          },
        },
      });
    },
  });

  return {
    createProvider: (enterpriseAccountId: string, providerService?: Providers) =>
      createProvider({ variables: { enterpriseAccountId, providerService } }),
    data,
    loading,
    error,
  };
};

export default createIdentityProvider;
