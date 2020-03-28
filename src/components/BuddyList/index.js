import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Window } from 'react95';
import {
  BuddyListMain,
  BuddyListSection,
  BuddyListToolbar,
  Loader,
  WindowHeader,
  SignIn,
} from '~/components';

const BuddyListWindow = styled(Window)`
  width: 400px;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

export default function BuddyList({ loading, viewer, slackTeams }) {
  if (loading) return <Loader />;

  const [activeTab, setActiveTab] = useState(viewer ? 0 : 1);
  const [authenticating, setAuthenticating] = useState(false);

  if (authenticating) return <Loader />;

  return (
    <BuddyListWindow>
      <WindowHeader
        title={
          viewer
            ? `${viewer.name}'s Buddy List`
            : 'Sign In to your Buddy List'
        }
      />
      {viewer && (
        <BuddyListToolbar
          activeTab={activeTab}
          authenticated={viewer}
          onTabChange={setActiveTab}
        />
      )}
      <BuddyListMain>
        {activeTab === 0 &&
          slackTeams.map(slackTeam => (
            <BuddyListSection
              key={slackTeam.gid}
              slackTeam={slackTeam}
            />
          ))
        }
        {activeTab === 1 && (
          <SignIn
            authenticated={Boolean(viewer)}
            onLoggedIn={() => {
              setActiveTab(0);
              setAuthenticating(false);
            }}
            onRequestLogin={() => {
              setAuthenticating(true);
            }} />
        )}
      </BuddyListMain>
    </BuddyListWindow >
  );
};

BuddyList.defaultProps = {
  viewer: null,
  slackTeams: [],
};

BuddyList.propTypes = {
  loading: PropTypes.bool.isRequired,
  viewer: PropTypes.shape({
    name: PropTypes.string,
  }),
  slackTeams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
};

