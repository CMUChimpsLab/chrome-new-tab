/*
 * File: populate-db.js
 * Project: Chrome New Tab
 * File Created: Saturday, 7th July 2018 9:14:53 am
 * Description: Inserts questions directly to mongo
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Sunday, 8th July 2018 1:23:24 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import Questions from '../../api/questions/questions';
import Options from '../../api/options/options';
import Users from '../../api/users/users';
import questions from './raw-question-data';

function insertQuestion({ title, category, description, url, options }) {
  // create question
  const questionId = Questions.insert({
    title,
    category,
    description,
    url
  });

  // if options are provided...
  options.forEach(optionTitle => {
    Options.insert({
      title: optionTitle,
      questionId,
      count: 0
    });
  });
}

// clear questions, options, and user responsess
function clear() {
  Questions.remove({});
  Options.remove({});
  Users.update({}, { $set: { responses: [] } });
}

// populates db
const resetMongo = () => {
  console.log('Resetting Questions database');
  clear();
  questions.forEach(q => {
    insertQuestion(q);
  });
};

export default resetMongo;
