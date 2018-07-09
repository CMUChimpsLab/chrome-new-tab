/*
 * File: Menu.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 8:25:03 am
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Monday, 9th July 2018 1:11:31 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Menu extends Component {
  static propTypes = {
    filter: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string,
    categories: PropTypes.instanceOf(Array).isRequired
  };

  static defaultProps = {
    selectedCategory: null
  };

  handleShuffle = () => {};

  render() {
    return (
      <div>
        <center>[TODO: Add little menu here]</center>
        <ul>
          <li>Shuffle button?</li>
          <li>
            Filter by category button:{' '}
            {this.props.categories.map(category => (
              <button
                key={category}
                onClick={() => this.props.filter(category)}
              >
                {category}
              </button>
            ))}
            {this.props.selectedCategory ? this.props.selectedCategory : 'None'}
          </li>
          <li>Skip button</li>
          <li>View all button</li>
        </ul>
      </div>
    );
  }
}

export default Menu;
