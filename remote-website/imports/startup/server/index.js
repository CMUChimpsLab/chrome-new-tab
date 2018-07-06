import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import './register-api';

import Questions from '../../api/questions/questions';
import Users from '../../api/users/users';
import Emails from '../../api/emails/emails';

// set up REST API
if (Meteor.isServer) {
  // return questions cursor to client
  // allows data to be fetched every time Users collection
  // is updated
  Meteor.publish('users', function questionsPublication() {
    return Users.find();
  });

  Meteor.startup(() => {
    // Global configuration
    const Api = new Restivus({
      version: 'v1',
      useDefaultAuth: true,
      prettyJson: true
    });

    // Generates: GET/POST on /api/v1/test, and GET/PUT/DELETE
    // on /api/v1/test/:id
    // for Test collection (works on any Mongo collection)
    Api.addCollection(Questions);

    // used by SocialSafety to create users
    Api.addCollection(Users);
    Api.addCollection(Emails);
  });
}
