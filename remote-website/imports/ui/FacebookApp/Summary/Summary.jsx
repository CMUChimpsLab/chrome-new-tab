/*
 * File: Summary.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 12:12:59 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Wed Jul 18 2018
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import SummaryQuestion from './SummaryQuestion/SummaryQuestion';
import Users from '../../../api/users/users';
import './Summary.scss';
import './SummaryQuestion/SummaryQuestion.scss';
import MaterialIcon from '../../../../node_modules/react-google-material-icons';

export class Summary extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    userExists: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        guid: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    questions: PropTypes.instanceOf(Array),
    user: PropTypes.shape({
      responses: PropTypes.array.isRequired
    })
  };

  static defaultProps = {
    questions: [],
    user: null
  };

  renderQuestions = () => {
    // ids of questions answered
    const answeredIds = this.props.user.responses.map(res => res.questionId);
    // functions to filter questions
    const contains = _id => answeredIds.indexOf(_id) > -1;

    // given question id, find opt id in response
    const optIdInResponse = _id =>
      contains(_id)
        ? this.props.user.responses.filter(function(res) {
          return res.questionId == _id;
        })[0].optionId
        : null;

    // given question id, find question's all options
    const getOptsFromId = _id =>
      this.props.questions.filter(function(q) {
        return q._id == _id;
      })[0].options;

    // given question id, find specific opt that user selects in response
    const getResOptTitle = _id =>
      contains(_id)
        ? getOptsFromId(_id).filter(function(opt) {
            return opt._id == optIdInResponse(_id);
          })[0].title
        : '';

    return this.props.questions.map(q => (
      <SummaryQuestion
        key={q._id}
        question={q}
        userGuid={this.userGuid}
        answered={contains(q._id)}
        userOption={getResOptTitle(q._id)}
      />
    ));
  };

  renderHeader() {
    return (
      <div className="header-q">
        <div className="header-icon" />
        <div className="header-title">Question</div>
        <div className="header-popular">Most Popular</div>
        <div className="header-user">Your choice </div>
        <div className="header-link">Link to Facebook</div>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="annotation">
        <p>
          <span id="vote-yes">
            <MaterialIcon icon="check_circle" size={28} />
          </span>
          <span className="anno-text">answered questions</span>
          <span id="vote-no">
            <MaterialIcon icon="contact_support" id="vote-no" size={28} />
          </span>
          <span className="anno-text">unanswered questions</span>
        </p>
      </div>
    );
  }

  render() {
    if (this.props.loading || !this.props.userExists) {
      return '';
    }

    // get userGuid from URL
    this.userGuid = this.props.match.params.guid;
    if (this.userGuid === undefined) {
      return 'Please use the Chrome Extension!';
    }

    return (
      <div>
        {this.renderHeader()}
        <div className="summary">{this.renderQuestions()}</div>
        {this.renderFooter()}
      </div>
    );
  }
}

// query used to fetch questions from database
const questionsQuery = gql`
  query Questions {
    questions {
      _id
      title
      category
      description
      url
      totalVotes
      topOption {
        title
        count
      }
      options {
        _id
        title
        count
      }
    }
  }
`;

export default compose(
  graphql(questionsQuery, {
    props: ({ data }) => ({ ...data })
  }),
  withTracker(props => {
    const usersHandle = Meteor.subscribe('users');
    const loading = !usersHandle.ready();
    const user = Users.findOne({ guid: props.match.params.guid });
    const userExists = !loading && !!user;
    return {
      user,
      userExists
    };
  })
)(Summary);
