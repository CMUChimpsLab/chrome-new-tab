/*
 * File: Option.jsx
 * Project: Chrome New Tab
 * File Created: Friday, July 6 2018, 10:34 am
 * Description: Option functional component
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Saturday, 7th July 2018 10:02:05 am
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React from 'react';
import PropTypes from 'prop-types';

// css
import './Option.scss';
import '../../assets/font.css';

// saves vote when user selects an option
// IMPORTANT: vote is not sent to the database until
// next question is selected
const Option = props => (
  <button
    key={props.option._id}
    onClick={() => props.handleVoted(props.option)}
    type="submit"
    className="fb-option"
  >
    {props.option.title}
  </button>
);

Option.propTypes = {
  handleVoted: PropTypes.func.isRequired,
  option: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }).isRequired
};

export default Option;
