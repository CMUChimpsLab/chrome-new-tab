/*
 * File: FacebookApp.jsx
 * Project: Chrome New Tab
 * File Created: Friday, July 6 2018, 10:59 am
 * Description: Main component for FacebookApp
 * Path: /facebookapp
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Monday, 9th July 2018 10:13:56 am
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
import Wrapper from '../Components/Wrapper/Wrapper';
import Users from '../../api/users/users';
import Menu from './Menu/Menu';

export class FacebookApp extends Component {
  static propTypes = {
    history: PropTypes.shape({
      go: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        guid: PropTypes.string
      }).isRequired
    }).isRequired,
    refetch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      responses: PropTypes.array.isRequired
    }),
    loading: PropTypes.bool.isRequired,
    aswerQuestion: PropTypes.func.isRequired,
    questions: PropTypes.instanceOf(Array),
    userExists: PropTypes.bool.isRequired
  };

  static defaultProps = {
    user: { responses: [] },
    questions: []
  };

  constructor(props) {
    super(props);
    this.state = { allAnswered: false };
  }

  componentDidMount = () => {
    // if (this.props.loading || !this.props.userExists) {
    //   return;
    // }
  };

  getRandomQuestion = max => Math.floor(Math.random() * max);

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

  renderQuestion = q => {
    if (q) {
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
    return 'Thanks for participating!';
  };

  render() {
    if (this.props.loading || !this.props.userExists) {
      return '';
    }

    // ids of questions answered
    const answeredIds = this.props.user.responses.map(res => res.questionId);

    // function to use in filter
    const contains = _id => answeredIds.indexOf(_id) > -1;

    // get questions that have NOT been answered
    const unansweredQuestions = this.props.questions.filter(
      q => !contains(q._id)
    );

    // get userGuid from URL
    this.userGuid = this.props.match.params.guid;
    if (this.userGuid === undefined) {
      return 'Please use the Chrome Extension!';
    }

    // there are questions to answer, display a random one
    const numQuestions = unansweredQuestions.length;
    const questionToRender =
      unansweredQuestions[this.getRandomQuestion(numQuestions)];

    return (
      <Wrapper>
        {!this.state.allAnswered && this.renderQuestion(questionToRender)}
        <Menu />
      </Wrapper>
    );
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

// pre-populate props using graphql and withTracker
export default compose(
  graphql(questionsQuery, {
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
