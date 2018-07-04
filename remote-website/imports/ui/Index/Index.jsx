import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';

import './Index.css';

export class Index extends Component {
  route = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <Wrapper>
        <div>
          <button
            className="facebook-button index-button"
            onClick={() => this.route('/facebookapp')}
          >
            Go to FacebookApp!
          </button>
        </div>
        <div>
          <button
            className="email-button index-button"
            onClick={() => this.route('/emailapp')}
          >
            Go to EmailApp!
          </button>
        </div>
      </Wrapper>
    );
  }
}

export default Index;
