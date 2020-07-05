import { ApolloError, gql, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { EnterpriseAccount } from './index.types';

export const ACCOUNT_QUERY = gql`
  query EnterpriseAccount($domain: String!) {
    enterpriseAccount(domain: $domain) {
      id
      domain
      name
      status
      identityProviders {
        id
        service
        acsUrl
      }
    }
  }
`;

const useEnterpriseAccount = (
  domain: string,
): {
  data: { enterpriseAccount?: EnterpriseAccount };
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useEnterpriseAccount must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(ACCOUNT_QUERY, {
    client,
    variables: { domain },
  });

  return {
    data,
    loading,
    error,
  };
};

export default useEnterpriseAccount;
