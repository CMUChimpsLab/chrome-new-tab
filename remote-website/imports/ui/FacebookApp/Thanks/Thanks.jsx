/*
 * File: Thanks.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 23rd July 2018 11:28:14 am
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 *          Wanling Ding (wanlingd@andrew.cmu.edu)
 * -----
 * Last Modified: Fri Apr 26, 2019
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React from 'react';
import PropTypes from 'prop-types';

import MaterialIcon from '../../../../node_modules/react-google-material-icons';
import './Thanks.scss';
import '../../assets/font.css';
// import Photos from '../Photos/Photos';

const Thanks = props => (
  <div className="circle-body">
    <div className="thanks-body">
      {/* <Photos amount={5} width={300} height={300} /> */}
      <p>Facebook Privacy Checkup</p>

      
      <span
        role="button"
        id="end-restart"
        className={props.done ? '' : 'done'}
        onClick={() => props.handleRestart()}
      >
        <div className="title">
          {props.done ? 'Restart Checkup' : 'Continue Checkup'}
        </div>
        <span className="icon">
          <MaterialIcon icon="settings_backup_restore" size={20} />
        </span>
      </span>

      <span
        role="button"
        id="end-viewall"
        onClick={() => props.handleViewAll()}
      >
        <div className="title">View all questions</div>
        <span className="icon">
          <MaterialIcon icon="view_headline" size={20} />
        </span>
      </span>


      <span role="button" id="end-logout" onClick={() => props.logout()}>
        <div className="title">Go to Facebook</div>
        <span className="icon">
          <MaterialIcon icon="open_in_new" size={20} />
        </span>
      </span>



    </div>
  </div>
);

Thanks.propTypes = {
  handleViewAll: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired
};

export default Thanks;
