/*
 * File: populate-db.js
 * Project: Chrome New Tab
 * File Created: Saturday, 7th July 2018 9:14:53 am
 * Description: Inserts questions directly to mongo
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Thu Feb 23 2020
 * -----
 * Copyright (c) 2018 - 2020 CHIMPS Lab, HCII CMU
 */

import { CSV } from 'meteor/clinical:csv';
import Questions from '../../api/questions/questions';
import Options from '../../api/options/options';
import Users from '../../api/users/users';
import questions from './raw-question-data';

function insertQuestion({
  title,
  category,
  description,
  scrapeTag,
  url,
  options
}) {
  // create question
  const questionId = Questions.insert({
    title,
    category,
    scrapeTag,
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

// called to populate db with mTurk data
function insertMTurkData(data) {
  // for each response
  data.forEach(response => {
    // for each question
    Object.keys(response).forEach((title, index) => {
      if (index >= 35 && index <= 58) {
        // find question by name
        const question = Questions.findOne({ title });
        // make sure it exists
        if (!question) {
          // console.log(`Skipping ${title}`);
          return;
        }

        // const opt = Options.findOne({
        //   questionId: question._id,
        //   title: response[title].trim()
        // });

        // if (!opt) {
        //   console.log(`Option NOT FOUND: ${title}
        // "${response[title].trim()}"`);
        //   return;
        // }

        Options.update(
          {
            questionId: question._id,
            title: response[title].trim()
          },
          {
            $inc: {
              count: 1
            }
          }
        );
      }
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
  console.log('Resetting Questions database...');
  clear();
  questions.forEach(q => {
    insertQuestion(q);
  });
  // eslint-disable-next-line no-undef
  CSV.parse(Assets.getText('mTurk_raw_2019.csv'), {
    header: true,
    step: result => {
      insertMTurkData(result.data);
    }
  });
  console.log('Done');
};

export default resetMongo;
