import React, { Component } from "react";
// import "../assets/font.css";;
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import "./Option.css";

export class Option extends Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption = (optid, opttitle) => {
    console.log("title is" + opttitle);
    this.props
      .incOptionCount({
        variables: {
          _id: optid
        }
      })
      .catch(error => {
        console.error(error);
      });
    this.props.handleVoted(opttitle);
  };

  render() {
    return (
      <button
        key={this.props._id}
        onClick={() => this.handleOption(this.props._id, this.props.title)}
        type="submit"
        className="hehe"
      >
        {this.props.title}: {this.props.count}
      </button>
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
})(Option);
// export default Option;
