/*
 * File: SummaryQuestion.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 2:31:06 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Thu Jul 19 2018
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import cheerio from 'cheerio';
import ReactLoading from 'react-loading';

import './SummaryQuestion.scss';
import MaterialIcon from '../../../../../node_modules/react-google-material-icons';

export class SummaryQuestion extends Component {
  static propTypes = {
    question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      scrapeTag: PropTypes.number.isRequired,
      options: PropTypes.array.isRequired,
      topOption: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    userGuid: PropTypes.string.isRequired,
    answered: PropTypes.bool.isRequired,
    userOption: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentSetting: null
    };
  }

  componentDidMount = () => {
    this.getCurrentSelectedOption(
      this.props.question.url,
      this.props.userGuid,
      this.setActualOption
    );
  };

  getCurrentSelectedOption = (url, guid, callback) => {
    Meteor.call('getSetting', url, guid, (error, result) => {
      const $ = cheerio.load(result.content);
      const list = [];

      // Timeline and Tagging Settings
      if (this.props.question.scrapeTag === 0) {
        $('div[class="content"]')
          .find('div > div > div > div > a > span')
          .each(function(index, element) {
            list.push(
              $(element)
                .clone() // clone the element
                .children() // select all the children
                .remove() // remove all the children
                .end() // again go back to selected element
                .text()
            );
          });
        if (list.length > 1) {
          // document.getElementById(
          //   'test'
          // ).innerHTML = `Your current selected option:${list[1]}`;
          callback(list[1]);
        }
      } else if (this.props.question.scrapeTag === 1) {
        $('div[class="clearfix"]')
          .find('div > div > a > span')
          .each(function(index, element) {
            list.push($(element).text());
          });
        if (list.length > 1) {
          // document.getElementById(
          //   'test'
          // ).innerHTML = `Your current selected option:${list[1]}`;
          callback(list[1]);
        }
      } else if (this.props.question.scrapeTag === 2) {
        $('form')
          .find('div > div > a > span')
          .each(function(index, element) {
            list.push($(element).text());
          });
        if (list.length > 3) {
          // document.getElementById(
          //   'test'
          // ).innerHTML = `Your current selected option: ${list[3]}`;
          callback(list[3]);
        }
      } else if (this.props.question.scrapeTag === 3) {
        $('ul')
          .find('li > div > div > div > a > span')
          .each(function(index, element) {
            list.push(
              $(element)
                .clone() // clone the element
                .children() // select all the children
                .remove() // remove all the children
                .end() // again go back to selected element
                .text()
            );
          });
        if (list.length > 1) {
          // document.getElementById(
          //   'test'
          // ).innerHTML = `Your current selected option: ${list[1]}`;
          callback(list[1]);
        }
      } else if (this.props.question.scrapeTag === 4) {
        const op = $('input[id="search_filter_public"]').prop('checked')
          ? 'Yes'
          : 'No';
        // document.getElementById(
        //   'test'
        // ).innerHTML = `Your current selected option:${op}`;
        callback(op);
      } else if (this.props.question.scrapeTag === 5) {
        $('div[class="content"]')
          .find('div > div > div > div > a > span')
          .each(function(index, element) {
            list.push($(element).text());
          });
        if (list.length > 1) {
          // document.getElementById(
          //   'test'
          // ).innerHTML = `Your current selected option: ${list[0]}`;
          callback(list[0]);
        }
      } else if (this.props.question.scrapeTag === 6) {
        $('form')
          .find('div > div > a > span')
          .each(function(index, element) {
            list.push($(element).text());
          });
        if (list.length > 0) {
          // document.getElementById(
          //   'test'
          // ).innerHTML = `Your current selected option:${list[0]}`;
          callback(list[0]);
        }
      } else if (this.props.question.scrapeTag >= 7) {
        console.log("Can't scrape ads yet.");
      } else {
        console.log('Make sure this question has a valid scrapeTag');
      }
    });
  };

  setActualOption = currentSetting => {
    console.log(currentSetting);
    this.setState({
      currentSetting
    });
  };

  // login to Facebook, don't require info
  loginAndRedirect = url => {
    Meteor.loginWithFacebook({ requestPermissions: [] }, function(err) {
      if (err) {
        console.error(err);
      } else {
        window.open(url, '_blank');
      }
    });
  };

  renderStatus = () => (
    <div className="sum-icon">
      {this.props.answered ? (
        <span id="vote-yes">
          <MaterialIcon icon="check_circle" size={28} />
        </span>
      ) : (
        <span id="vote-no">
          <MaterialIcon icon="contact_support" id="vote-no" size={32} />
        </span>
      )}
    </div>
  );

  renderCurrentSetting = () => {
    if (this.state.currentSetting) {
      return this.state.currentSetting;
    }
    return <ReactLoading type="balls" color="#e5b540" height="5%" width="5%" />;
  };

  render() {
    return (
      <div className="summary-q">
        {this.renderStatus()}
        <div className="sum-title">{this.props.question.title}</div>
        <div className="sum-popular">{this.props.question.topOption.title}</div>
        {/* <div className="sum-popular">{this.renderCurrentSetting()}</div> */}
        <div className="sum-user">
          {this.props.answered ? this.props.userOption : ''}
        </div>
        <div className="sum-link">
          <button
            className="summary-q-button"
            onClick={() => this.loginAndRedirect(this.props.question.url)}
          >
            Change on Facebook
          </button>
        </div>
      </div>
    );
  }
}

export default SummaryQuestion;
