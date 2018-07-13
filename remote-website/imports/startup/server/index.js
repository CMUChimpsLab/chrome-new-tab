import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { HTTP } from 'meteor/http';
// import scrapeIt from 'scrape-it';
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
      async testMethod(url) {
        check(url, String);
        console.log(Meteor.user().services.facebook.accessToken)
        return HTTP.get(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            // 'User-Agent': 'Meteor/1.0'
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            // Cookie: '[get it from chrome]'
          }
          // },
          // params: {
          //   access_token: Meteor.user().services.facebook.accessToken
          // }
        });
        // === OR ===
        // const page = await scrapeIt(url, {
        //   title: 'title'
        // });
        // return page.data.title;
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
  });
}
