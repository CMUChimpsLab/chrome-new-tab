/*
 * File: Index.jsx
 * Project: Chrome New Tab
 * File Created: Thursday, July 5 2018, 8:35 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Saturday, 7th July 2018 8:06:14 am
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Components/Wrapper/Wrapper';

import './Index.scss';

export class Index extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  route = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <Wrapper>
        <div>
          <button
            className="facebook-button index-button"
            onClick={() => this.route('/facebookapp/all')}
          >
            Go to FacebookApp!
          </button>
        </div>
        <div>
          <button
            className="email-button index-button"
            onClick={() => this.route('/emailapp')}
          >
            Go to EmailApp!
          </button>
        </div>
      </Wrapper>
    );
  }
}

export default Index;
