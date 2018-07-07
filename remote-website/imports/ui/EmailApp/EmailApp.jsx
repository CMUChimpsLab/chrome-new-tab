import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Email from './Email/Email';
import Wrapper from '../Components/Wrapper/Wrapper';

import '../assets/font.css';
import './EmailApp.scss';

export class EmailApp extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        guid: PropTypes.string
      }).isRequired
    }).isRequired,
    emails: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    emails: []
  };

  render() {
    if (this.props.loading) {
      return '';
    }
    document.title = 'Email App';
    console.log(`received guid: ${this.props.match.params.guid}`);
    return (
      <Wrapper>
        {this.props.emails.map(email => (
          <Email key={email._id} email={email} />
        ))}
      </Wrapper>
    );
  }
}

const emailsQuery = gql`
  query Emails {
    emails {
      _id
      subject
      body
      from
      user {
        guid
      }
    }
  }
`;

export default graphql(emailsQuery, {
  props: ({ data }) => ({ ...data })
})(EmailApp);
