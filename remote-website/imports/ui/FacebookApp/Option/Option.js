import React, { Component } from "react";

export class Option extends Component {
  render() {
    return (
      <li>
        <input type="radio" value="todo" name="option" />
        {this.title} with {this.count} votes
        <br />
      </li>
    );
  }
}

export default Option;
