import Emoji from 'react-emoji-render';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import Caret from './Caret.svg';

const SLACK_USERS = gql`
  query SlackTeams($id: ID!, $first: Int!, $cursor: String,) {
    node(id: $id) {
      ... on SlackTeam {
        id
        name
        slackUsers(first: $first, after: $cursor) {
          edges{
            node {
              id
              name
              statusIcon
            }  
          }
          pageInfo {
            endCursor
            hasNextPage
          } 
        }
      }
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 6px 0;
  align-items: center;
`;

const Dropdown = styled.img`
  cursor: pointer;
  transform: rotate(${props => (props.expanded ? '0' : '-90')}deg);
`;
const Title = styled.p`
  font-weight: 600;
`;

const Buddies = styled.ul`
  padding-left: 40px;
`;

const Buddy = styled.li`
  color: ${props => (props.online ? 'black' : 'grey')};
`;

const BuddyName = styled.span`
  margin-left: ${props => (props.statusIcon ? '0px' : '24px')};
`;

export default function BuddyListSection({ slackTeam }) {
  const [expanded, toggleExpand] = useState(true);


  const { data, loading, fetchMore } = useQuery(SLACK_USERS, {
    variables: { id: slackTeam.gid, first: 25 },
    pollInterval: 30000
  });

  if (loading) return null;


  const { node: { slackUsers: { edges, pageInfo } } } = data;
  const slackUsers = edges || [];
  const onlineUsersCount = slackUsers.filter((u) => u.node.online).length;

  if (pageInfo.hasNextPage) {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.node.slackUsers.edges;
        const { pageInfo: newPageInfo } = fetchMoreResult.node.slackUsers;

        return newEdges.length
          ? {
            node: {
              ...previousResult.node,
              slackUsers: {
                // eslint-disable-next-line no-underscore-dangle
                __typename: previousResult.node.slackUsers.__typename,
                edges: [...previousResult.node.slackUsers.edges, ...newEdges],
                pageInfo: newPageInfo,
              }
            }
          }
          : previousResult;
      }
    });
  }

  return (
    <div>
      <Row>
        <Dropdown
          expanded={expanded}
          onClick={() => toggleExpand(!expanded)}
          src={Caret}
        />
        <Title>
          {slackTeam.name}
          {' '}
          ({onlineUsersCount} / {slackTeam.slackUsersCount})
        </Title>
      </Row>

      <Buddies>
        {expanded &&
          slackUsers.map(user => (
            <Buddy online={user.online} key={user.id}>
              {user.node.statusIcon && <Emoji text={user.node.statusIcon} />}
              <BuddyName statusIcon={Boolean(user.node.statusIcon)}>{user.node.name}</BuddyName>
            </Buddy>
          ))}
      </Buddies>
    </div>
  );
}

BuddyListSection.propTypes = {
  slackTeam: PropTypes.shape({
    gid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slackUsersCount: PropTypes.number.isRequired,
  }).isRequired
};