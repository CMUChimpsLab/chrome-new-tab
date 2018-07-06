import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { graphql } from 'react-apollo';
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
    })
  };

  static defaultProps = {
    user: { responses: [] }
  };

  loadNext = () => {
    this.props.refetch();
  };

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
    if (this.props.user === null) {
      return 'User does not exist!';
    }

    // ids of questions answered
    const answeredIds = this.props.user.responses.map(res => res.question._id);

    // function to use in filter
    const contains = _id => answeredIds.indexOf(_id) > -1;

    const unansweredQuestions = questions.filter(q => !contains(q._id));

    // there are questions to answer, display the first
    if (unansweredQuestions.length > 0) {
      const q = unansweredQuestions[0];
      return (
        <Question
          loadNext={this.loadNext}
          key={q._id}
          question={q}
          userGuid={userGuid}
          answered={false}
        />
      );
    }

    // all questions were answered, render all
    return questions.map(q => (
      <Question
        loadNext={this.loadNext}
        key={q._id}
        question={q}
        userGuid={userGuid}
        answered
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
      description
      options {
        _id
        title
        count
      }
    }
  }
`;

export default graphql(userQuery, {
  options: props => ({ variables: { guid: props.match.params.guid } }),
  props: ({ data }) => ({ ...data })
})(
  withTracker(() => {
    console.log('withTracker');
    return {
      hello: 'hello',
      users: Users.find({}).fetch()
    };
  })(FacebookApp)
);
