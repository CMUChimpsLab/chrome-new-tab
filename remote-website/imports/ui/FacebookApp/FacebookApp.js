import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

export class FacebookApp extends Component {
  handleUpvote = _id => {
    this.props
      .incOptionCount({
        variables: {
          _id,
        },
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderQs = questionsQuery => {
    if (questionsQuery.loading) {
      return '';
    }
    return questionsQuery.questions.map(q => (
      <div key={q._id}>
        <h3>{q.title}</h3>
        <ul>
          {q.options.map(opt => (
            // key has to be in every element you iterate on
            <li key={opt._id}>
              {opt.title} with {opt.count} count
              <br />
              <button
                className="vote"
                onClick={() => this.handleUpvote(opt._id)}
              >
                vote me
              </button>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1>FacebookApp</h1>
        {this.renderQs(this.props.questionsQuery)}
      </div>
    );
  }
}

// you forgot to pass this as props (down there)
const incOptionCount = gql`
  mutation incrementCount($_id: ID!) {
    incrementCount(_id: $_id) {
      _id
    }
  }
`;

const questionsQuery = gql`
  query Questions {
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

// pass all your queries here
export default compose(
  graphql(incOptionCount, {
    name: 'incOptionCount',
    options: {
      // I gave a name to the query up there
      // so every time you execute this mutation,
      // it will automatically run the query
      // named "Questions" again :)
      refetchQueries: ['Questions'],
    },
  }),
  graphql(questionsQuery, {
    name: 'questionsQuery',
  }),
)(FacebookApp);
