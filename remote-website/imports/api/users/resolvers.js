// import Users from './users';
import Emails from '../emails/emails';
import Users from '../users/users';

export default {
  Query: {
    users() {
      return Users.find({}).fetch();
    },
  },

  User: {
    emails: user =>
      Emails.find({
        _id: { $in: user.emails },
      }).fetch(),
  },

  Mutation: {
    createUser(_, { guid, name }) {
      const userId = Users.insert({
        guid,
        name,
        emails: [],
      });
      return Users.findOne(userId);
    },

    deleteUser(_, { _id }) {
      const removed = Users.findOne(_id);
      Users.remove(_id);
      return removed;
    },

    setName(_, { guid, name }) {
      Users.update(
        { guid },
        {
          $set: {
            name,
          },
        },
      );
      return Users.findOne({ guid });
    },
  },
};
