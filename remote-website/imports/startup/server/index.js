import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import './register-api';

import Resolutions from '../../api/resolutions/resolutions';
import Questions from '../../api/questions/questions';
import Users from '../../api/users/users';

// set up REST API
if (Meteor.isServer) {
  Meteor.startup(() => {
    // Global configuration
    const Api = new Restivus({
      version: 'v1',
      useDefaultAuth: true,
      prettyJson: true,
    });

    // Generates: GET/POST on /api/v1/test, and GET/PUT/DELETE
    // on /api/v1/test/:id
    // for Test collection (works on any Mongo collection)
    Api.addCollection(Resolutions);
    Api.addCollection(Questions);

    // used by ChromeGuard to create users
    Api.addCollection(Users);
  });
}
