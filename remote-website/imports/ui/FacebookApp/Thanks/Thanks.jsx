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
    <button id="end-viewall" onClick={() => props.handleViewAll()}>
      View all questions
    </button>
    <button id="end-logout" onClick={() => props.logout()}>
      Go to Facebook
    </button>
    <button id="end-restart" onClick={() => props.handleRestart()}>
      Restart Checkup
    </button>
  </div>
);

Thanks.propTypes = {
  handleViewAll: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Thanks;
