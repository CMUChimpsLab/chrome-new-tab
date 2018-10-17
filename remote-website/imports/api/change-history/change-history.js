import { Mongo } from 'meteor/mongo';

const ChangeHistory = new Mongo.Collection('change-history');

export default ChangeHistory;
