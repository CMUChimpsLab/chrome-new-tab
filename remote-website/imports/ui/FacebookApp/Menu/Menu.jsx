/*
 * File: Menu.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 8:25:03 am
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 *          Wanling Ding (wanlingd@andrew.cmu.edu)
 * -----
 * Last Modified: Fri Apr 26, 2019
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Menu.scss';


import MaterialIcon from '../../../../node_modules/react-google-material-icons';

export class Menu extends Component {
  static propTypes = {
    filter: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string,
    categories: PropTypes.instanceOf(Array).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  static defaultProps = {
    selectedCategory: null
  };

  constructor(props) {
    super(props);
    // Valid conditions: 2 or 3
    this.condition = 3;
    this.state = { categoryFilter: null, closed: true };
  }

  handleShuffle = () => {};

  handleViewAll = () => {
    window.open(`${this.props.history.location.pathname}/summary`, '_blank');
  };

  // goHome = () => {
  //   window.open(`${this.props.history.location.pathname}`);
  // };

  toggleClosed = () => {
    this.setState(prevState => ({
      closed: !prevState.closed
    }));
  };

  render() {
    return (
      <div className="sidebar">
        {/* <div className="filter">
          <span id="filter-title">
            Categories
            {this.props.selectedCategory
              ? `: ${this.props.selectedCategory}`
              : ''}
          </span>
          {this.props.categories.length > 0 &&
            this.props.categories.map((category, index) => {
              if (index === this.props.categories.length - 1) {
                return (
                  <span
                    key={category}
                    role="button"
                    className="categories-last"
                    onClick={() => this.props.filter(category)}
                  >
                    <div className="title">{category}</div>
                  </span>
                );
              }
              return (
                <span
                  key={category}
                  role="button"
                  className="categories"
                  onClick={() => this.props.filter(category)}
                >
                  <div className="title">{category}</div>
                </span>
              );
            })}
        </div> */}
        <span role="button" id="view-all" onClick={() => this.handleViewAll()}>
          <div className="title">View all questions</div>
          <span className="icon">
            <MaterialIcon icon="view_headline" size={20} />
          </span>
        </span>

        <span role="button" id="goto-fb" onClick={() => this.props.logout()}>
          <div className="title">Go to Facebook</div>
          <span className="icon">
            <MaterialIcon icon="open_in_new" size={20} />
          </span>
        </span>

        {/* <span role="button" id="home" onClick={() => this.toggleClosed()}>
          <div className="title">Home</div>
          <span className="icon">
            <MaterialIcon icon="home" size={20} />
          </span>
        </span> */}

      </div>
    );
  }
}

export default Menu;
