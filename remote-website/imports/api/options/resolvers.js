import Options from './options';

export default {
  Mutation: {
    createOption(_, { title, questionId }) {
      const optId = Options.insert({
        title,
        count: 0,
        questionId
      });
      return Options.findOne(optId);
    },

    incrementCount(_, { _id }) {
      Options.update(_id, {
        $inc: {
          count: 1
        }
      });
      return Options.findOne(_id);
    }
  }
};
