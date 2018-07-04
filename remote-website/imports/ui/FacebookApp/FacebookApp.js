import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Question from './Question/Question';
import '../assets/font.css';
import Wrapper from '../Wrapper/Wrapper';

// import "../assets/font.css";

export class FacebookApp extends Component {
  renderQs = ({ loading, questions }) => {
    if (loading) {
      return '';
    }

    // get userGuid from URL
    const userGuid = this.props.match.params.guid;
    if (userGuid === undefined) {
      return 'Please use the Chrome Extension!';
    }

    // check if user exists
    // 'all' shows all questions
    if (this.props.user === null && userGuid !== 'all') {
      return 'User does not exist!';
    }

    let unansweredQuestions = questions;

    if (userGuid !== 'all') {
      // ids of questions answered
      const answeredIds = this.props.user.responses.map(res => {
        return res.question._id;
      });
      const contains = _id => answeredIds.indexOf(_id) > -1;

      unansweredQuestions = questions.filter(q => !contains(q._id));
    }

    return unansweredQuestions.map(q => (
      <Question
        key={q._id}
        _id={q._id}
        userGuid={userGuid}
        title={q.title}
        options={q.options}
      />
    ));
  };

  render() {
    return <Wrapper>{this.renderQs(this.props)}</Wrapper>;
  }
}

const userQuery = gql`
  query Questions($guid: String) {
    user(guid: $guid) {
      _id
      responses {
        question {
          _id
        }
      }
    }
    questions {
      _id
      title
      options {
        _id
        title
        count
      }
    }
  }
`;

export default graphql(userQuery, {
  options: props => {
    return { variables: { guid: props.match.params.guid } };
  },
  props: ({ data }) => ({ ...data }),
})(FacebookApp);
