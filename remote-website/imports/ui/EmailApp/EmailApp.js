import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
// import Emails from '../../api/emails/emails';

import Email from './Email/Email';
import Wrapper from '../Wrapper/Wrapper';

import '../assets/font.css';
import './EmailApp.css';

export class EmailApp extends Component {
  render() {
    if (this.props.loading) {
      return '';
    }
    document.title = 'Email App';
    return (
      <Wrapper>
        {this.props.emails.map(email => (
          <Email
            key={email._id}
            _id={email._id}
            subject={email.subject}
            body={email.body}
            from={email.from}
            userGuid={email.user.guid}
          />
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
  props: ({ data }) => ({ ...data }),
})(EmailApp);
// export default compose(
//   graphql(emailsQuery, {
//     props: ({ data }) => ({ ...data }),
//   }),
//   withTracker(() => {
//     return { emails2: Emails.find({}).fetch() };
//   }),
// )(EmailApp);
