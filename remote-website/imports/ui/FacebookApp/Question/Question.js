import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Option from "../Option/Option";

export class Question extends Component {
  // maybe move this inside the Option component?
  // then you would have to move the mutation too

  handleChange = e => {
    const optid = e.target.value;
    this.props
      .incOptionCount({
        variables: {
          _id: optid
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ul>
          {this.props.options.map(opt => (
            <Option
              key={opt._id}
              _id={opt._id}
              title={opt.title}
              count={opt.count}
            />
          ))}
        </ul>
        <button onClick={e => this.handleChange(e)}>Submit</button>
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
  name: "incOptionCount",
  options: {
    // I gave a name to the query up there
    // so every time you execute this mutation,
    // it will automatically run the query
    // named "Questions" again :)
    refetchQueries: ["Questions"]
  }
})(Question);
