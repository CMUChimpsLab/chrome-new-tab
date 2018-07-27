/*
 * File: Thanks.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 23rd July 2018 11:28:14 am
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React from 'react';
import PropTypes from 'prop-types';

import './Thanks.scss';
import '../../assets/font.css';

const Thanks = props => (
  <div className="thanks-body">
    <h1>Thanks for participating!</h1>
    <p>Now please log out of Facebook! We will not be using it anymore.</p>
    <button onClick={() => props.handleViewAll()}>View all questions</button>
    <button onClick={() => props.logout()}>Logout Facebook</button>
  </div>
);

Thanks.propTypes = {
  handleViewAll: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Thanks;
