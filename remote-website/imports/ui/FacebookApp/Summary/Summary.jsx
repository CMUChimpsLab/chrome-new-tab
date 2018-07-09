/*
 * File: Summary.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 12:12:59 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Monday, 9th July 2018 1:34:14 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

export class Summary extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        guid: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  renderQuestion = () => {};

  render() {
    return <div>Hi there, your guid is {this.props.match.params.guid}</div>;
  }
}

// query used to fetch questions from database
const questionsQuery = gql`
  query Questions($guid: String!) {
    user(guid: $guid) {
      responses {
        question {
          _id
        }
      }
    }
    questions {
      _id
      title
      category
      description
      url
      options {
        _id
        title
        count
      }
    }
  }
`;

export default graphql(questionsQuery, {
  options: props => ({ variables: { guid: props.match.params.guid } }),
  props: ({ data }) => ({ ...data })
})(Summary);
