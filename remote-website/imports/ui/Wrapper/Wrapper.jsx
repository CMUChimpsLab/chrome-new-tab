import React, { Component } from 'react';
import './Wrapper.scss';

export class Wrapper extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="inner-wrap">{this.props.children}</div>
      </div>
    );
  }
}

export default Wrapper;
