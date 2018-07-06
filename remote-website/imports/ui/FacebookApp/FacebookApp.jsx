/*
 * File: FacebookApp.jsx
 * Project: Chrome New Tab
 * File Created: Friday, July 6 2018, 10:59 am
 * Description: Main component for FacebookApp
 * Path: /facebookapp
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Friday, 6th July 2018 4:27:20 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Question from './Question/Question';
import '../assets/font.css';
import Wrapper from '../Wrapper/Wrapper';
import Users from '../../api/users/users';

export class FacebookApp extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        guid: PropTypes.string
      }).isRequired
    }).isRequired,
    refetch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      responses: PropTypes.array.isRequired
    }),
    aswerQuestion: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  // called when user advances to the next question
  submitVote = (question, option) => {
    this.props
      .aswerQuestion({
        variables: {
          guid: this.userGuid,
          questionId: question._id,
          optionId: option._id
        }
      })
      .then(() => {
        this.props.refetch(); // check for new questions
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderQs = ({ loading, questions }) => {
    if (loading) {
      return '';
    }

    // get userGuid from URL
    this.userGuid = this.props.match.params.guid;
    if (this.userGuid === undefined) {
      return 'Please use the Chrome Extension!';
    }

    // check if user exists
    if (this.props.user === null) {
      return 'User does not exist!';
    }

    // ids of questions answered
    const answeredIds = this.props.user.responses.map(res => res.questionId);

    // function to use in filter
    const contains = _id => answeredIds.indexOf(_id) > -1;

    // get questions that have NOT been answered
    const unansweredQuestions = questions.filter(q => !contains(q._id));

    // there are questions to answer, display the first
    if (unansweredQuestions.length > 0) {
      const q = unansweredQuestions[0];
      return (
        <Question
          submitVote={this.submitVote}
          key={q._id}
          question={q}
          userGuid={this.userGuid}
          answered={false}
        />
      );
    }

    // all questions were answered
    return 'Thank you for participating';
  };

  render() {
    return <Wrapper>{this.renderQs(this.props)}</Wrapper>;
  }
}

// mutation used to submit vote to database
const aswerQuestion = gql`
  mutation answerQuestion($guid: String!, $questionId: ID!, $optionId: ID!) {
    aswerQuestion(guid: $guid, questionId: $questionId, optionId: $optionId) {
      responses {
        question {
          title
          _id
        }
        option {
          title
          _id
          count
        }
      }
    }
  }
`;

// query used to fetch questions from database
const userQuery = gql`
  query Questions {
    questions {
      _id
      title
      description
      options {
        _id
        title
        count
      }
    }
  }
`;

// pre-populate props using graphql and withTracker
export default compose(
  graphql(userQuery, {
    options: props => ({ variables: { guid: props.match.params.guid } }),
    props: ({ data }) => ({ ...data })
  }),
  graphql(aswerQuestion, {
    name: 'aswerQuestion'
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
)(FacebookApp);
