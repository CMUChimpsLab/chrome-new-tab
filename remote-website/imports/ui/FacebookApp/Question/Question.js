import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Option from '../Option/Option';

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'no selection yet' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const optid = this.state.value;
    // alert("option id is: " + optid);
    this.props
      .incOptionCount({
        variables: {
          _id: optid,
        },
      })
      .catch(error => {
        console.error(error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            pick an option:
            <br />
            <select
              value={this.state.value}
              onChange={this.handleChange}
              size={this.props.options.length}
            >
              {this.props.options.map(opt => (
                // <option key={opt._id} value={opt._id}>
                //   {opt.title} with {opt.count} votes
                // </option>
                <Option
                  key={opt._id}
                  _id={opt._id}
                  title={opt.title}
                  count={opt.count}
                />
              ))}
            </select>
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
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

export default graphql(incOptionCount, {
  name: 'incOptionCount',
  options: {
    // I gave a name to the query up there
    // so every time you execute this mutation,
    // it will automatically run the query
    // named "Questions" again :)
    refetchQueries: ['Questions'],
  },
})(Question);
