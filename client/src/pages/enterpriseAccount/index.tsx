import { ChildDataProps, graphql } from '@apollo/react-hoc';

import { gql } from 'apollo-boost';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useOssoConfig from '../../utils/@enterprise-oss/osso/useOssoConfig';
import SamlConfigForm from '../../components/samlConfigurationForm/index';
import { Enterprise } from '../../utils/@enterprise-oss/osso/index';

const ACCOUNT_QUERY = gql`
  query EnterpriseAccount($domain: String!) {
    enterpriseAccount(domain: $domain) {
      id
      domain
      name
      status
      provider {
        id
        provider
        acsUrl
      }
    }
  }
`;

interface EnterpriseAccountProps {
  enterpriseAccount: Enterprise,
}

function EnterpriseAccount({ enterpriseAccount }: EnterpriseAccountProps) {
  const {
    // handleSubmit,
    // handleInputChange,
    inputs,
  } = useOssoConfig(enterpriseAccount);
  console.log(inputs);

  return <SamlConfigForm samlProvider={enterpriseAccount.provider} />;
}

interface Response {
  enterpriseAccount: Enterprise;
}

interface MatchParams {
  domain: string;
}

interface MatchProps extends RouteComponentProps {
  params: MatchParams,
}

type InputProps = {
  match: MatchProps;
};

type Variables = {
  domain: string;
};

type ChildProps = ChildDataProps<MatchProps, Response, Variables>;

const withEnterpriseAccount = graphql<InputProps, Response, Variables, ChildProps>(
  ACCOUNT_QUERY, {
  options: ({ match: { params: { domain } } }) => (
    { variables: { domain } }
  ),
}
);

export default withEnterpriseAccount(({ data: { loading, enterpriseAccount, error } }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  return <EnterpriseAccount enterpriseAccount={enterpriseAccount!} />;
});