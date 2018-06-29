import Questions from "./questions";
import Options from "../options/options";

export default {
  Query: {
    questions() {
      return Questions.find({}).fetch();
    }
  },

  Question: {
    options: question =>
      Options.find({
        questionId: question._id
      }).fetch()
  },

  Mutation: {
    createQuestion(_, { title, options = [] }) {
      const questionId = Questions.insert({
        title
      });

      // if options are provided...
      for (var option of options) {
        Options.insert({
          title: option,
          questionId,
          count: 0
        });
      }

      return Questions.findOne(questionId);
    },
    deleteQuestion(_, { _id }) {
      const removed = Questions.findOne(_id);
      Questions.remove(_id);
      return removed;
    }
  }
};
