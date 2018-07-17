import Questions from './questions';
import Options from '../options/options';

export default {
  Query: {
    questions() {
      return Questions.find({}).fetch();
    }
  },

  Question: {
    options: question => Options.find({ questionId: question._id }).fetch(),
    totalVotes: question => {
      const options = Options.find({ questionId: question._id }).fetch();
      return options.map(opt => opt.count).reduce((acc, count) => acc + count);

      // async question => {
      //   const test = Options.aggregate([
      //     {
      //       $match: {
      //         questionId: question._id
      //       }
      //     },
      //     {
      //       $group: {
      //         _id: null,
      //         totalCount: { $sum: '$count' }
      //       }
      //     }
      //   ]);
      //   let ret = 0;
      //   await test.toArray((err, result) => {
      //     // console.log(result[0].totalCount);
      //     ret = result[0].totalCount;
      //     return result[0].totalCount;
      //   });
      //   console.log(ret);
      //   return 0;
    },
    topOption: question =>
      Options.findOne({ questionId: question._id }, { sort: { count: -1 } })
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
