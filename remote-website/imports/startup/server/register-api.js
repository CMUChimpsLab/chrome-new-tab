import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import merge from 'lodash/merge';

import ResolutionSchema from '../../api/resolutions/Resolution.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

import QuestionSchema from '../../api/questions/Question.graphql';
import QuestionResolvers from '../../api/questions/resolvers';

import OptionSchema from '../../api/options/Option.graphql';
import OptionResolvers from '../../api/options/resolvers';

// dsfdsfsdfsdgkcnfdhjxzdadsahfddsdsajjffkkksd

const typeDefs = [OptionSchema, ResolutionSchema, QuestionSchema];

const resolvers = merge(
  OptionResolvers,
  ResolutionResolvers,
  QuestionResolvers,
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
