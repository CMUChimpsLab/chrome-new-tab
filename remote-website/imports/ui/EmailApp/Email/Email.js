import React, { Component } from 'react';
import './Email.css';

export class Email extends Component {
  render() {
    return (
      <div className="email">
        <div className="subject">Subject: {this.props.subject}</div>
        <div className="body">Body: {this.props.body}</div>
      </div>
    );
  }
}

export default Email;
