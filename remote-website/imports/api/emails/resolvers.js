import Emails from './emails';
import Users from '../users/users';

export default {
  Query: {
    emails() {
      return Emails.find({}).fetch();
    },
  },

  Email: {
    user: email =>
      Users.findOne({
        guid: email.userGuid,
      }),
  },

  Mutation: {
    createEmail(_, { subject, body, userGuid }) {
      const emailId = Emails.insert({
        subject,
        body,
        userGuid,
        isPhishing: 0,
        notPhishing: 0,
      });

      // add email to user collection
      Users.update(
        { guid: userGuid },
        {
          $push: {
            emails: emailId,
          },
        },
      );

      return Emails.findOne(emailId);
    },
    deleteEmail(_, { _id }) {
      const removed = Emails.findOne(_id);
      Emails.remove(_id);
      return removed;
    },
    votePhishy(_, { _id }) {
      Emails.update(_id, {
        $inc: {
          isPhishing: 1,
        },
      });
      return Emails.findOne(_id);
    },
    voteNotPhishy(_, { _id }) {
      Emails.update(_id, {
        $inc: {
          notPhishing: 1,
        },
      });
      return Emails.findOne(_id);
    },
  },
};
