import React from 'react';
import './Wrapper.scss';

export default () => (
  <div className="wrapper">
    <div className="inner-wrap">{this.props.children}</div>
  </div>
);
