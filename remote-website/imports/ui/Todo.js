import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Todo extends Component {
  handleDelete = _id => {
    this.props
      .deleteResolution({
        variables: {
          _id,
        },
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <li>{this.props.name}</li>
        <button
          style={{ backgroundColor: 'chocolate' }}
          onClick={() => this.handleDelete(this.props._id)}
        >
          Looks phishy!
        </button>
        <button
          style={{ backgroundColor: 'greenyellow' }}
          onClick={() => this.handleDelete(this.props._id)}
        >
          Not phishy
        </button>
        <br />
        <br />
      </div>
    );
  }
}

const deleteResolution = gql`
  mutation deleteResolution($_id: ID!) {
    deleteResolution(_id: $_id) {
      _id
    }
  }
`;

export default graphql(deleteResolution, {
  name: 'deleteResolution',
  options: {
    refetchQueries: ['Resolutions'],
  },
})(Todo);
