import ApolloClient, { gql } from 'apollo-boost';
import { useQuery, ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { render } from 'react-dom';
import { reset as react95Styles, themes } from 'react95';
import { ThemeProvider, createGlobalStyle, } from 'styled-components';
import { InMemoryCache } from 'apollo-cache-inmemory';
import globalStyles from './index.styles';
import BuddyList from '~/components/BuddyList';

const ResetStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');
  ${react95Styles}
  ${globalStyles}
`;

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: '/graphql',
  cache
});

const ROOT_QUERY = gql`
  query RootQuery {
    viewer {
      id
      name
    }
    slackTeams {
      gid
      name
      slackUsersCount
    }
  }
`;

const App = () => {
  const {
    loading,
    refetch,
    data = { slackTeams: [], viewer: null }
  } = useQuery(ROOT_QUERY, {
    pollInterval: 30000,
    client
  });

  window.addEventListener('message', (message) => {
    if (message.data === 'loggedIn') {
      refetch();
    }
  });

  return (
    <ApolloProvider client={client}>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <BuddyList
          loading={loading}
          slackTeams={data.slackTeams}
          viewer={data.viewer}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
};

render(<App />, document.getElementById('root'));
