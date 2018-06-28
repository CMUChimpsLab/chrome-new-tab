import { Mongo } from 'meteor/mongo';

const Questions = new Mongo.Collection('questions');

export default Questions;
