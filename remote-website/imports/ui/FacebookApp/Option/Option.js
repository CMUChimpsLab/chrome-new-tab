import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
//css
import './Option.css';
import '../../assets/font.css';

export class Option extends Component {
  handleOption = ({ _id, questionId, userGuid, title }) => {
    this.props
      .aswerQuestion({
        variables: {
          guid: userGuid,
          questionId,
          optionId: _id,
        },
      })
      .then(() => {
        this.props.handleVoted(title);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <button
        key={this.props._id}
        onClick={() => this.handleOption(this.props)}
        type="submit"
        className="fb-option"
      >
        {this.props.title}: {this.props.count}
      </button>
    );
  }
}

// you forgot to pass this as props (down there)
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

export default graphql(aswerQuestion, {
  name: 'aswerQuestion',
  options: {
    // I gave a name to the query up there
    // so every time you execute this mutation,
    // it will automatically run the query
    // named "Questions" again :)
    //refetchQueries: ['Questions'],
  },
})(Option);
// export default Option;
