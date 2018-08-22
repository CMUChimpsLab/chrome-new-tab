import Emails from '../emails/emails';
import Users from '../users/users';
import Options from '../options/options';
import Questions from '../questions/questions';

export default {
  Query: {
    users() {
      return Users.find({}).fetch();
    },
    user(_, { guid }) {
      return Users.findOne({ guid });
    }
  },

  User: {
    emails: user =>
      Emails.find({
        _id: { $in: user.emails }
      }).fetch()
  },

  Response: {
    question: resp => Questions.findOne(resp.questionId),
    option: resp => Options.findOne(resp.optionId)
  },

  Mutation: {
    createUser(_, { guid, name }) {
      const userId = Users.insert({
        guid,
        name,
        emails: [],
        responses: []
      });
      return Users.findOne(userId);
    },

    resetResponses(_, { guid }) {
      Users.update({ guid }, { $set: { responses: [] } });
      return Users.findOne({ guid });
    },

    answerQuestion(
      _,
      { guid, questionId, optionId, currentSetting, condition, clickedChange }
    ) {
      // insert responses ids to user object
      Users.update(
        { guid },
        {
          $push: {
            responses: {
              questionId,
              optionId,
              currentSetting,
              condition,
              clickedChange,
              timestamp: new Date()
            }
          }
        }
      );

      // increment option count
      Options.update(optionId, {
        $inc: {
          count: 1
        }
      });

      return Users.findOne({ guid });
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
            name
          }
        }
      );
      return Users.findOne({ guid });
    }
  }
};
