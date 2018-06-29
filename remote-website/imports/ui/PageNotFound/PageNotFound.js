import React, { Component } from 'react';

export class PageNotFound extends Component {
  render() {
    document.title = 'Page Not Found';
    return <div>Page Not Found :(</div>;
  }
}

export default PageNotFound;
