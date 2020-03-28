import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  Cutout,
  WindowContent,
} from 'react95';

const StyledWindowContent = styled(WindowContent)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
`;

const StyledCutout = styled(Cutout)`
  background-color: white;
  height: 100%;
`;

const CutoutInner = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export default function BuddyListMain({ children }) {
  return (
    <StyledWindowContent>
      <StyledCutout>
        <CutoutInner>
          {children}
        </CutoutInner>
      </StyledCutout>
    </StyledWindowContent>
  );
};

BuddyListMain.propTypes = {
  children: PropTypes.node.isRequired,
};