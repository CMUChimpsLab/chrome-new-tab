import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export class FacebookApp extends Component {
  handleUpvote = _id => {
    this.props
      .incOptionCount({
        variables: {
          _id
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderQs = questionsQuery => {
    if (questionsQuery.loading) {
      return "";
    }
    return questionsQuery.questions.map(q => (
      <div key={q._id}>
        <h3>{q.title}</h3>
        <ul>
          {q.options.map(opt => (
            <li>
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

const incOptionCount = gql`
  mutation incrementCount($_id: ID!) {
    incrementCount(_id: $_id) {
      _id
    }
  }
`;

const questionsQuery = gql`
  query {
    questions {
      _id
      title
      options {
        title
        count
      }
    }
  }
`;

export default graphql(questionsQuery, {
  name: "questionsQuery",
  options: {
    refetchQueries: ["questions"]
  }
})(FacebookApp);
