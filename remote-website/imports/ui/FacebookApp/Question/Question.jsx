/*
 * File: Question.jsx
 * Project: Chrome New Tab
 * File Created: Friday, July 6 2018, 11:01 am
 * Description: Question component, uses state
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Friday, July 6 2018, 1:53 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Option from '../Option/Option';
// css
import './Question.scss';
import '../../assets/font.css';

export class Question extends Component {
  static propTypes = {
    answered: PropTypes.bool.isRequired,
    question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      options: PropTypes.array.isRequired
    }).isRequired,
    submitVote: PropTypes.func.isRequired,
    userGuid: PropTypes.string.isRequired,
    redirect: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      voteSubmitted: props.answered,
      votedOption: null
    };
  }

  getMaxVote = () => {
    let max = 0;
    let maxTitle = '';
    let sum = 0;
    this.props.question.options.forEach(op => {
      sum += op.count;
      if (op.count > max) {
        max = op.count;
        maxTitle = op.title;
      }
    });
    const percentage = ((max / sum) * 100).toFixed(0);
    return (
      <div>
        <p className="ans">
          Your have selected{' '}
          <span className="ans-important" id="ans-user">
            {this.state.votedOption.title}
          </span>
          <br />
          <span className="ans-important" id="ans-percent">
            {percentage}&#37;
          </span>{' '}
          of people think
          <span className="ans-important" id="ans-crowd">
            {' '}
            {maxTitle}{' '}
          </span>
          is the best option
        </p>
        <div className="action-buttons">
          <button
            id="action-next"
            onClick={() =>
              this.props.submitVote(this.props.question, this.state.votedOption)
            }
          >
            Next Question
          </button>
          {/* <br /> */}
          <button onClick={() => this.login(this.props)} id="action-fb">
            Change my setting on Facebook
          </button>
        </div>
      </div>
    );
  };

  login = () => {
    Meteor.loginWithFacebook(
      { requestPermissions: ['public_profile', 'email'] },
      function(err) {
        if (err) {
          console.log('Handle errors here: ', err);
        } else {
          window.location =
            'https://www.facebook.com/settings?tab=privacy&section=composer&view';
        }
      }
    );
  };

  // called when user selects an option
  handleVoted = option => {
    this.setState({
      voteSubmitted: true,
      votedOption: option
    });
  };

  // renders each option
  renderUnvoted() {
    return (
      <div className="fb-opt-list">
        <ul>
          {this.props.question.options.map(opt => (
            <li key={opt._id}>
              <Option option={opt} handleVoted={this.handleVoted} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="fb-question">
        <div className="fb-title">{this.props.question.title}</div>
        <div className="fb-description">{this.props.question.description}</div>
        {this.state.voteSubmitted ? this.getMaxVote() : this.renderUnvoted()}
      </div>
    );
  }
}

export default Question;
