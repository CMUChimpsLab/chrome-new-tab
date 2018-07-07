import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { ServiceConfiguration } from 'meteor/service-configuration';

import './register-api';
import Questions from '../../api/questions/questions';
import Users from '../../api/users/users';
import Emails from '../../api/emails/emails';
import populate from './populate-db';

// set up REST API
if (Meteor.isServer) {
  // return questions cursor to client
  // allows data to be fetched every time Users collection
  // is updated
  Meteor.publish('users', function questionsPublication() {
    return Users.find();
  });

  Meteor.startup(() => {
    // populate db with questions
    populate();

    // Global configuration
    const Api = new Restivus({
      version: 'v1',
      useDefaultAuth: true,
      prettyJson: true
    });

    ServiceConfiguration.configurations.remove({
      service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: '254983351900362',
      secret: 'fcd1f0919887d644608bb36edcec038e'
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
