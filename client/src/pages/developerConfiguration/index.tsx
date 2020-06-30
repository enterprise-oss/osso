import { ChildDataProps, graphql } from '@apollo/react-hoc';

import { gql } from 'apollo-boost';
import React from 'react';

const CONFIG_QUERY = gql`
  query DeveloperConfig {
    oAuthClients {
      id
      name
      status
    }
  }
`;

function DeveloperConfig({ }: any) {
  return <div>ok</div>;
}

interface Response {
  oAuthClients: any; // TODO
}


type ChildProps = ChildDataProps<{}, Response, {}>;

const withEnterpriseAccount = graphql<{}, Response, {}, ChildProps>(
  CONFIG_QUERY
);

export default withEnterpriseAccount(({ data: { loading, oAuthClients, error } }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  return <DeveloperConfig oAuthClients={oAuthClients!} />;
});