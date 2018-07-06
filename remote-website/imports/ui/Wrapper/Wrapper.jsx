import React from 'react';
import PropTypes from 'prop-types';
import './Wrapper.scss';

const Wrapper = props => (
  <div className="wrapper">
    <div className="inner-wrap">{props.children}</div>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node
};

Wrapper.defaultProps = {
  children: []
};

export default Wrapper;
