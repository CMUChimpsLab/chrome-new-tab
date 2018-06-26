import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  state = {
    text: '',
  };

  submitForm = () => {
    this.props
      .createResolution({
        variables: {
          name: this.name.value,
        },
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ text: '' });
  };

  handleChange = e => {
    const newText = e.target.value;
    this.setState({
      text: newText,
    });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.submitForm();
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <input
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          type="text"
          ref={input => (this.name = input)}
          value={text}
        />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    );
  }
}

// options to auto refetch
export default graphql(createResolution, {
  name: 'createResolution',
  options: {
    refetchQueries: ['Resolutions'],
  },
})(ResolutionForm);
