/*
 * File: SummaryQuestion.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 2:31:06 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 *          Amy Liu (ayl2@andrew.cmu.edu)
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
      //original: PropTypes.string.isRequired,
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
      const cheerio = require('cheerio');
      console.log(url);
      console.log(result);
      if (result === undefined || result === null || 'set-cookie' in result.headers) {
        callback('');
      }
      else {
        const $ = cheerio.load(result.content);
        // Scrape instructions for Facebook's "Privacy" questions
        if (this.props.question.scrapeTag === 0) {
          const op = $('li[class*=openPanel]')
                      .find($('div[class="_nlm fwb"]'))
                      .text();
          console.log(op);
          callback(op);
        } 
        else if (this.props.question.scrapeTag === 1) {
          const op = $('div[class="clearfix"]')
                      .find($('span[class="_55pe"]'))
                      .text();
          console.log(op);
          callback(op);
        }
        else if (this.props.question.scrapeTag === 2) {
          const op = $('li[class*=openPanel]')
                      .find($('span[class="fbSettingsListItemContent fcg"]'))
                      .children()
                      .first()
                      .text();
          console.log(op);
          callback(op);
        } 
        else if (this.props.question.scrapeTag === 3) {
          const op = $('input[id="search_filter_public"]').prop('checked')
            ? 'Yes'
            : 'No';
          console.log(op);
          callback(op);
        } 
        else if (this.props.question.scrapeTag === 4) {
          const op = ($('li[class*=openPanel]')
                      .find($('div[class="_nlm fwb"]'))
                      .text() === 'On')
            ? 'Yes'
            : 'No';
          console.log(op);
          callback(op);
        }
        else if (this.props.question.scrapeTag === 5) {
          const op = ($('div[data-testid="tfs_header_button"]')
                    .find($('a'))
                    .text() === "Get Started")
            ? 'No (Off)'
            : 'Yes (On)';
          callback(op);
        }
        else if (this.props.question.scrapeTag === 6) {
          console.log('Why is this not working');
          const op = ($('.fbNoTrustedFriends')
                      .prop('class') === "fcg")
            ? 'No (Off)'
            : 'Yes (On)';
          callback(op);
        }
        else if (this.props.question.scrapeTag === 7) {
          const op = /*$('div[class="_4p8x _4-u3"]')*/ $('span[class="_y5_"]').text()
        //   ? 'Yes (On)';
          //  : 'No (Off)';
          callback(op);            
        }
        else if (this.props.question.scrapeTag === 8) {
          const op = ($('input[name="storyresharesetting"]')
                      .prop('value') === "1")
            ? 'Yes'
            : 'No';
          callback(op);
        }

        else {
          console.log('Make sure this question has a valid scrapeTag');
        }
      }
    });
  };

  setActualOption = currentSetting => {
    console.log(currentSetting);
    this.setState({
      currentSetting
    });
  };
  /*
  // login to Facebook, don't require info
  loginAndRedirect = url => {
    Meteor.loginWithFacebook({ requestPermissions: [] }, function(err) {
      if (err) {
        console.error(err);
      } else {
        window.open(url, '_blank');
      }
    });
  };*/

  loginAndRedirect = url => {
    window.open(url, '_blank');
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

  /*
  renderCurrentSetting = () => {
    if (this.state.currentSetting) {
      return this.state.currentSetting;
    }
    return <ReactLoading type="balls" color="#e5b540" height="5%" width="5%" />;
  };
  */
  renderCurrentSetting = () => {
    const curr = this.state.currentSetting;
    const pop = this.props.question.topOption.title;

    if (this.props.answered && 
        this.state.userOption !== "Not sure") {
      const vote = this.state.userOption;
      if (vote === curr && curr === pop) {
        return <b className="curr-ok">Current Setting:&nbsp;{curr}</b>
      }
      else if (vote !== curr && curr !== pop && vote !== pop) {
        return <b className="curr-alert">Current Setting:&nbsp;{curr}</b>
      }
      else {
        return <b className="curr-warning">Current Setting:&nbsp;{curr}</b>
      }
    }
    else {
      if (curr === pop) {
        return <b className="curr-ok">Current Setting:&nbsp;{curr}</b>
      }
      else {
        return <b className="curr-alert">Current Setting:&nbsp;{curr}</b>
      }
    }
  };


  render() {
    return (
      <div className="summary-q">
        {this.renderStatus()}
        <div className="sum-title">
          {this.props.question.title}<br />
          {this.renderCurrentSetting()}
        </div>
        <div className="sum-popular">{this.props.question.topOption.title}</div>
        {/* <div className="sum-popular">{this.renderCurrentSetting()}</div> */}
        <div className="sum-user">
          {this.props.answered ? this.props.userOption : ''}
        </div>
        <div className="sum-link">
          <button
            className="summary-q-button"
            onClick={() => {
              this.loginAndRedirect(this.props.question.url);
            }}
          >
            Change on Facebook
          </button>
        </div>
      </div>
    );
  }
}

export default SummaryQuestion;
