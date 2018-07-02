import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import merge from 'lodash/merge';

import ResolutionSchema from '../../api/resolutions/Resolution.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

import QuestionSchema from '../../api/questions/Question.graphql';
import QuestionResolvers from '../../api/questions/resolvers';

import OptionSchema from '../../api/options/Option.graphql';
import OptionResolvers from '../../api/options/resolvers';

import UserSchema from '../../api/users/User.graphql';
import UserResolvers from '../../api/users/resolvers';

import EmailSchema from '../../api/emails/Email.graphql';
import EmailResolvers from '../../api/emails/resolvers';

// dsfdsffhgjhfkkksd

const typeDefs = [
  UserSchema,
  EmailSchema,
  OptionSchema,
  ResolutionSchema,
  QuestionSchema,
];

const resolvers = merge(
  UserResolvers,
  EmailResolvers,
  OptionResolvers,
  ResolutionResolvers,
  QuestionResolvers,
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
