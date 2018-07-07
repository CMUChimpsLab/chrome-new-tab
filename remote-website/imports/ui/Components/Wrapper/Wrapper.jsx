/*
 * File: Wrapper.jsx
 * Project: Chrome New Tab
 * File Created: Thursday, July 5 2018, 8:35 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Friday, July 6 2018, 11:33 am
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

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
