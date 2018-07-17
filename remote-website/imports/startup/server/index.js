import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';

import './register-api';
import Questions from '../../api/questions/questions';
import Users from '../../api/users/users';
import Emails from '../../api/emails/emails';
// import resetMongo from './reset-mongo';

// set up REST API
if (Meteor.isServer) {
  // return questions cursor to client
  // allows data to be fetched every time Users collection
  // is updated
  Meteor.publish('users', function questionsPublication() {
    return Users.find();
  });

  Meteor.startup(() => {
    // WARNING: THIS RESETS THE DATABASE OF QUESTIONS
    // AND USER RESPONSES. BE CAREFUL!!!
    // resetMongo();

    // expose method to client
    Meteor.methods({
      async getSetting(url, guid) {
        check(url, String);
        check(guid, String);
        return HTTP.get(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'User-Agent':
              'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            Cookie: Users.findOne({ guid }).facebook_cookie
          }
        });
      },
      hasCookies(guid) {
        check(guid, String);
        return Users.findOne({ guid }).facebook_cookie != null;
      }
    });

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

    // Maps to: /api/v1/cookies/:guid
    Api.addRoute('cookies/:guid', {
      post() {
        // find user
        const user = Users.findOne({ guid: this.urlParams.guid });
        if (!user) {
          return {
            statusCode: 404
          };
        }

        // update cookie
        Users.update(
          { guid: this.urlParams.guid },
          { $set: { facebook_cookie: this.request.body.data } }
        );
        return {
          statusCode: 200
        };
      }
    });
  });
}
