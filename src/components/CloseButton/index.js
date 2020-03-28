import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'react95';

const StyledButton = styled(Button)`
  margin: 1px -6px 0 auto;
`;

const Label = styled.span`
  font-weight: bold;
  transform: translateY(-1px);
`;

export default function CloseButton({ onClick }) {
  return (
    <StyledButton
      onClick={onClick}
      size="sm"
      square
    >
      <Label>x</Label>

    </StyledButton>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};