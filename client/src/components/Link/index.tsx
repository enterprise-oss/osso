import React from 'react';
import { withRouter } from 'react-router-dom';

const Link = ({ history, to, onClick, tag: Tag, ...rest }) => (
  <Tag
    {...rest}
    onClick={(event) => {
      onClick(event);
      history.push(to);
    }}
  />
);

// Link.propTypes = {
//   to: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   onClick: PropTypes.func,
// };

export default withRouter(Link);
