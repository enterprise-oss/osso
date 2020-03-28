import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from 'react95';
import AimHeaderImage from './aimHeader.png';

const StyledTabs = styled(Tabs)`
  margin-left: 1em;
  display: ${props => props.authenticated ? 'block' : 'none'};
`;

const Image = styled.img`
  display: block;
  height: auto;
  width: 30%;
  margin: 1em auto;
  border: 4px solid #03052b;
  margin-bottom: 24px;
`;

export default function BuddyListToolbar({ activeTab, authenticated, onTabChange }) {
  return (
    <>
      <Image src={AimHeaderImage} />
      <StyledTabs
        authenticated={authenticated}
        value={activeTab}
        onChange={onTabChange}
      >
        <Tab value={0}>Online</Tab>
        <Tab value={1}>List Setup</Tab>
      </StyledTabs>
    </>
  );
};

BuddyListToolbar.propTypes = {
  activeTab: PropTypes.number.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onTabChange: PropTypes.func.isRequired,
};