import PropTypes from 'prop-types';
import { Button } from 'react95';
import React from 'react';
import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function SignIn({ authenticated, onRequestLogin, onLoggedIn }) {
  const openPopup = () => {
    onRequestLogin && onRequestLogin();
    const width = 548;
    const height = 600;
    const y = window.top.outerHeight / 2 + window.top.screenY - (height / 2);
    const x = window.top.outerWidth / 2 + window.top.screenX - (width / 2);

    window.open(
      'auth/slack',
      'Log In',
      `toolbar=0,status=0,width=${width},height=${height},left=${x + 400},top=${y}`
    );

    window.addEventListener('message', (message) => {
      if (message.data === 'loggedIn') {
        onLoggedIn();
      }
    });
  };

  return (
    <FlexDiv>
      <Button onClick={openPopup}>
        {authenticated ? 'Add a Slack Team' : 'Sign In with Slack'}
      </Button>
    </FlexDiv>
  );
}

SignIn.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  onRequestLogin: PropTypes.func.isRequired,
};
