import React from 'react';
import Wrapper from '../Wrapper/Wrapper';

export default () => {
  document.title = 'Page Not Found';
  return (
    <Wrapper>
      <div>Page Not Found :(</div>
    </Wrapper>
  );
};
