import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import React, { createContext, ReactElement } from 'react';

import { OssoClientOptions, OssoContextValue, OssoProviderProps } from './index.types';

const cache = new InMemoryCache();
let link: ApolloLink;
let client: ApolloClient<NormalizedCacheObject>;

const buildClient = (clientOptions?: OssoClientOptions) => {
  const graphEndpoint = clientOptions?.uri || '/graphql';

  link = new HttpLink({
    uri: graphEndpoint,
    credentials: 'same-origin',
  });

  return new ApolloClient({
    cache,
    link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};

const defaultValue: OssoContextValue = {
  client: undefined,
};

const OssoContext = createContext(defaultValue);

const OssoProvider = ({ children, client: clientOptions }: OssoProviderProps): ReactElement => {
  const client = buildClient(clientOptions);
  return <OssoContext.Provider value={{ client }}>{children} </OssoContext.Provider>;
};

export default OssoContext;
export { OssoProvider, client };
