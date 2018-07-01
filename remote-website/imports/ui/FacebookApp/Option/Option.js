import React, { Component } from 'react';

export class Option extends Component {
  render() {
    return (
      <li>
        {this.props.title} with {this.props.count} count
        <br />
        <button
          className="vote"
          onClick={() => this.props.handleUpvote(this.props._id)}
        >
          vote me
        </button>
      </li>
    );
  }
}

export default Option;
