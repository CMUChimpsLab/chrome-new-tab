import Questions from './questions';

export default {
  Query: {
    questions() {
      return Questions.find({}).fetch();
    },
  },
};
