import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';
import ResolutionSchema from '../../api/resolutions/Resolution.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

import QuestionSchema from '../../api/questions/Question.graphql';
import QuestionResolvers from '../../api/questions/resolvers';

// dsfdsfsdfsdfsd
const testSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
  questions: [Question]
}
`;

const typeDefs = [testSchema, ResolutionSchema, QuestionSchema];

const testResolvers = {
  Query: {
    hi() {
      return 'Hello thereee!';
    },
  },
};

const resolvers = merge(testResolvers, ResolutionResolvers, QuestionResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
