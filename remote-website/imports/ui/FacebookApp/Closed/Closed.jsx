/*
 * File: Closed.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 8:25:03 am
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Tue Oct 23 2018
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Closed.scss';

export class Closed extends Component {
  static propTypes = {
    openQuestion: PropTypes.func.isRequired
  };

  render() {
    return (
      <button
        onClick={() => {
          this.props.openQuestion();
        }}
      >
        nope
      </button>
    );
  }
}

export default Closed;
