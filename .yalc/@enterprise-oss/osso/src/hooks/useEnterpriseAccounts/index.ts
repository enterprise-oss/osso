import { ApolloError, gql } from '@apollo/client';
import { useState } from 'react';
import { useContext, useEffect } from 'react';

import OssoContext from '~/client';

import { EnterpriseAccountData } from './index.types';

const ACCOUNTS_QUERY = gql`
  query EnterpriseAccounts {
    enterpriseAccounts {
      id
      domain
      name
      status
    }
  }
`;

const useEnterpriseAccounts = (): {
  data: EnterpriseAccountData | null;
  loading: boolean;
  error?: ApolloError | string;
} => {
  const context = useContext(OssoContext);
  console.log(context);
  const client = context?.client;
  console.log(client);

  const [data, setData] = useState({} as EnterpriseAccountData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    client
      ?.query({ query: ACCOUNTS_QUERY })
      .then((response) => {
        setData(response?.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [client]);

  return {
    data,
    loading,
    error,
  };
};

export default useEnterpriseAccounts;

// if (client === undefined) {
//   return {
//     data: null,
//     loading: false,
//     error: 'useEnterpriseAccounts must be used inside an OssoProvider',
//   };
// }
