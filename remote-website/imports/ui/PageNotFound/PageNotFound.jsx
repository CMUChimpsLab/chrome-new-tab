/*
 * File: PageNotFound.jsx
 * Project: Chrome New Tab
 * File Created: Thursday, July 5 2018, 8:35 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Friday, July 6 2018, 11:32 am
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

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
