import { Mongo } from 'meteor/mongo';

const Emails = new Mongo.Collection('emails');

export default Emails;
