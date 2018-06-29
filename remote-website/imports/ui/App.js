import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import ResolutionForm from './ResolutionForm';
import Todo from './Todo';

const App = ({ loading, resolutions }) => {
  if (loading) {
    return null;
  }
  return (
    <div>
      <ResolutionForm />
      <ul>
        {resolutions.map(res => (
          <Todo key={res._id} name={res.name} _id={res._id} />
        ))}
      </ul>
    </div>
  );
};

// lint - default prop values
App.defaultProps = {
  loading: false,
  resolutions: [],
};

// lint - prop types w/ hack around forbidden propTypes
App.propTypes = {
  loading: PropTypes.bool,
  resolutions: PropTypes.instanceOf(Array),
};

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
  }
`;

const questionsQuery = gql`
  query {
    questions {
      _id
      title
    }
  }
`;

export default compose(
  graphql(questionsQuery, {
    name: 'getQuestions',
  }),
  graphql(resolutionsQuery, {
    props: ({ data }) => ({ ...data }),
  }),
)(App);
