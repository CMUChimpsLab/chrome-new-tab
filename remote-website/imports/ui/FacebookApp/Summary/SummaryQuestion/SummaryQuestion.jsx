/*
 * File: SummaryQuestion.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 2:31:06 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Wednesday, 11th July 2018 2:37:56 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import './SummaryQuestion.scss';

export class SummaryQuestion extends Component {
  static propTypes = {
    question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      options: PropTypes.array.isRequired
    }).isRequired,
    userGuid: PropTypes.string.isRequired,
    answered: PropTypes.bool.isRequired
  };

  // login to Facebook, don't require info
  loginAndRedirect = url => {
    Meteor.loginWithFacebook({ requestPermissions: [] }, function(err) {
      if (err) {
        console.error(err);
      } else {
        window.open(url, '_blank');
      }
    });
  };

  render() {
    return (
      <div className="summary-q">
        <div className="summary-q-title">
          {this.props.answered ? (
            <strong>{this.props.question.title}</strong>
          ) : (
            this.props.question.title
          )}
        </div>
        <div className="summary-q-popular">most popular op</div>
        <div className="summary-q-user">my choice</div>
        <div className="summary-q-link">link</div>
      </div>
    );
  }
}

export default SummaryQuestion;
