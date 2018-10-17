import ChangeHistory from './change-history';

export default {
  Query: {
    changeHistory() {
      return ChangeHistory.find({}).fetch();
    }
  }
};
