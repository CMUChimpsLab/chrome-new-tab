import Questions from './questions';
import Options from '../options/options';

export default {
  Query: {
    questions() {
      return Questions.find({}).fetch();
    }
  },

  Question: {
    options: question => Options.find({ questionId: question._id }).fetch()
  },

  Mutation: {
    createQuestion(_, { title, category, description, url, options = [] }) {
      // create question
      const questionId = Questions.insert({
        title,
        category,
        description,
        url
      });

      // If options are provided...
      options.forEach(optionTitle => {
        Options.insert({
          title: optionTitle,
          questionId,
          count: 0
        });
      });

      return Questions.findOne(questionId);
    },
    deleteQuestion(_, { _id }) {
      const removed = Questions.findOne(_id);
      Questions.remove(_id);
      return removed;
    }
  }
};
