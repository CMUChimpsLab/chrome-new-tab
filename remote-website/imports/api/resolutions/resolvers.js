import Resolutions from './resolutions';

export default {
  Query: {
    resolutions() {
      return Resolutions.find({}).fetch();
    },
  },

  Resolution: {
    goals: () => Resolutions.find({}).fetch(),
  },

  Mutation: {
    createResolution(_, { name }) {
      const resId = Resolutions.insert({
        name,
      });
      return Resolutions.findOne(resId);
    },
    deleteResolution(_, { _id }) {
      const removed = Resolutions.findOne(_id);
      Resolutions.remove(_id);
      return removed;
    },
  },
};
