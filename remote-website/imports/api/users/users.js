import { Mongo } from 'meteor/mongo';

const Users = new Mongo.Collection('chrome-users');

export default Users;
