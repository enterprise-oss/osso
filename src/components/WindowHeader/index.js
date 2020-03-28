import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { WindowHeader as R95WindowHeader } from 'react95';
import CloseButton from '~/components/CloseButton';
import AimIcon from './aimIcon.png';

const StyledWindowHeader = styled(R95WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.img`
  width: auto;
  height: 18px;
  margin-right: 6px;
`;

export default function WindowHeader({ onClose, title }) {
  return (
    <StyledWindowHeader>
      <Icon src={AimIcon} />
      <span>{title}</span>
      <CloseButton onClick={onClose} />
    </StyledWindowHeader>
  );
}
WindowHeader.defaultProps = {
  onClose: () => window.location.replace('logout'),
};
WindowHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};