import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';

export class PageNotFound extends Component {
  render() {
    document.title = 'Page Not Found';
    return (
      <Wrapper>
        <div>Page Not Found :(</div>
      </Wrapper>
    );
  }
}

export default PageNotFound;
