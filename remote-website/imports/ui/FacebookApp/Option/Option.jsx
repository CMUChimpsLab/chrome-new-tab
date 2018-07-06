import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
// css
import './Option.scss';
import '../../assets/font.css';

export class Option extends Component {
  static propTypes = {
    aswerQuestion: PropTypes.func.isRequired,
    handleVoted: PropTypes.func.isRequired,
    questionId: PropTypes.string.isRequired,
    userGuid: PropTypes.string.isRequired,
    option: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    }).isRequired
  };

  handleOption = ({ option, questionId, userGuid }) => {
    this.props
      .aswerQuestion({
        variables: {
          guid: userGuid,
          questionId,
          optionId: option._id
        }
      })
      .then(() => {
        this.props.handleVoted(option.title);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <button
        key={this.props.option._id}
        onClick={() => this.handleOption(this.props)}
        type="submit"
        className="fb-option"
      >
        {this.props.option.title}: {this.props.option.count}
      </button>
    );
  }
}

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
  name: 'aswerQuestion'
})(Option);
