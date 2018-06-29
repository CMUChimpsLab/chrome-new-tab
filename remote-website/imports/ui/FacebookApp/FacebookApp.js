import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export class FacebookApp extends Component {
  renderQs = questionsQuery => {
    if (questionsQuery.loading) {
      return '';
    }
    return questionsQuery.questions.map(q => <div key={q._id}>{q.title}</div>);
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

const questionsQuery = gql`
  query {
    questions {
      _id
      title
    }
  }
`;

export default graphql(questionsQuery, {
  name: 'questionsQuery',
  options: {
    refetchQueries: ['questions'],
  },
})(FacebookApp);
