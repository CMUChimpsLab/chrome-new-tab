import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Question from "./Question/Question";
import Flipcard from "./Flipcard";

export class FacebookApp extends Component {
  renderQs = questionsQuery => {
    if (questionsQuery.loading) {
      return "";
    }
    return questionsQuery.questions.map(q => (
      <Question key={q._id} _id={q.id} title={q.title} options={q.options} />
    ));
  };

  render() {
    return (
      <div>
        <h1>FacebookApp</h1>
        {this.renderQs(this.props.questionsQuery)}
        {Flipcard}
      </div>
    );
  }
}

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
export default graphql(questionsQuery, {
  name: "questionsQuery"
})(FacebookApp);
