import React, { Component } from 'react';
import './Email.css';

export class Email extends Component {
  render() {
    return (
      <div className="email">
        <div className="subject">
          <strong>Subject</strong>: {this.props.subject}
        </div>
        <div className="body">
          <strong>Body</strong>: {this.props.body}
        </div>
        {/* to be removed */}
        <div>
          <strong>...by</strong>: {this.props.userGuid}
        </div>
      </div>
    );
  }
}

export default Email;
