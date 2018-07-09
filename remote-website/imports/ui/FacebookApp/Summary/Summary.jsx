/*
 * File: Summary.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 12:12:59 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Monday, 9th July 2018 2:47:28 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Wrapper from '../../Components/Wrapper/Wrapper';
import SummaryQuestion from './SummaryQuestion/SummaryQuestion';
import Users from '../../../api/users/users';

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

    return this.props.questions.map(q => (
      <SummaryQuestion
        key={q._id}
        question={q}
        userGuid={this.userGuid}
        answered={contains(q._id)}
      />
    ));
  };

  render() {
    if (this.props.loading || !this.props.userExists) {
      return '';
    }

    // get userGuid from URL
    this.userGuid = this.props.match.params.guid;
    if (this.userGuid === undefined) {
      return 'Please use the Chrome Extension!';
    }

    return <Wrapper>{this.renderQuestions()}</Wrapper>;
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
