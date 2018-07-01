import React, { Component } from "react";

export class Option extends Component {
  render() {
    return (
      <li>
        <input type="radio" value={this.props._id} name="option" />
        {this.props.title} with {this.props.count} count
        <br />
      </li>
    );
  }
}

export default Option;
