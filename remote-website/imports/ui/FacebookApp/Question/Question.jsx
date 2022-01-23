/*
 * File: Question.jsx
 * Project: Chrome New Tab
 * File Created: Friday, July 6 2018, 11:01 am
 * Description: Question component, uses state
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 *          Wanling Ding (wanlingd@andrew.cmu.edu)
 *          Amy Liu (ayl2@andrew.cmu.edu)
 * -----
 * Last Modified: Fri Apr 26, 2019
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { Meteor } from 'meteor/meteor';
// import { BarChart } from 'react-d3-components/lib/';
// import { BarHorizontalChart } from 'react-d3-basic';
import MaterialIcon from '../../../../node_modules/react-google-material-icons';

import Option from './Option/Option';
import HBarGraph from './HBarGraph/HBarGraph';
// css
import './Question.scss';
import '../../assets/font.css';

export class Question extends Component {
  static propTypes = {
    condition: PropTypes.number.isRequired,
    answered: PropTypes.bool.isRequired,
    question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      scrapeTag: PropTypes.number.isRequired,
      totalVotes: PropTypes.number.isRequired,
      topOption: PropTypes.shape({
        title: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
      }).isRequired,
      options: PropTypes.array.isRequired
    }).isRequired,
    submitVote: PropTypes.func.isRequired,
    userGuid: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    //this.goBack = this.goBack.bind(this);

    this.MatchEnum = Object.freeze({ OK: 1, WARNING: 2, ALERT: 3 });

    this.state = {
      voteSubmitted: props.answered,
      votedOption: null,
      currentSetting: null,
      clickedChange: false,
      showGraph: false,
      status: null,
      prevOthersShown: false
    };

    // this.status = null;
  }

  componentDidMount = () => {
    this.getCurrentSelectedOption(
      this.props.question.url,
      this.props.userGuid,
      this.setActualOption
    );
  };

  getStats = () => {
    const getPercent = opt => {
      const p = ((opt.count / this.props.question.totalVotes) * 100).toFixed(0);
      return parseInt(p, 10);
    };
    const ops = this.props.question.options
      .filter(opt => opt.title !== 'Not sure')
      .map(opt => ({
        x: opt.title,
        y: getPercent(opt)
        // label: opt.title,
        // v: getPercent(opt)
      }));
    // return ops;
    return [
      {
        label: 'somethingA', // not sure what this is for lol
        values: ops
      }
    ];
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
        else if (this.props.question.scrapeTag === 3) { // LAST QUESTION
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
          /*const op = $('div[class="_4p8x _4-u3"]') $('span[class="_y5_"]').text()
            ? 'Yes (On)';
            : 'No (Off)';
          */
          callback('currently unavailable (find out through "Change this setting on Facebook")');
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

  getMaxVote = () => (
    // const { topOption, totalVotes } = this.props.question;
    // const percentage = ((topOption.count / totalVotes) * 100).toFixed(0);

    <div>
      {this.renderSelected()}
      {this.renderCurrentSetting()}
      {this.state.showGraph
        ? this.props.condition === 3 && this.renderCrowdChoice()
        : this.renderSeeOthers()}

      {/* <p className="ans">
          Your have selected{' '}
          <span className="ans-important" id="ans-user">
            {this.state.votedOption.title}
          </span>
          <br />
          Only show crowd response if condition 3
          {this.props.condition === 3 && (
            <div>
              <span id="ans-crowd">
                <span className="ans-important" id="ans-percent">
                  {percentage}&#37;
                </span>{' '}
                of {this.props.question.totalVotes} people think
                <span className="ans-important" id="ans-crowd">
                  {' '}
                  {topOption.title}{' '}
                </span>
                is the best option
              </span>
              <BarChart
                data={this.getStats()}
                width={400}
                height={200}
                margin={{ top: 20, bottom: 20, left: 30, right: 10 }}
              />
            </div>
          )}
        </p> */}
      <div className="action-buttons">
        {this.renderActionButtons()}
        <div className="changefacebook">{this.renderChangeFacebook()}</div>
      </div>
    </div>
  );

  setActualOption = currentSetting => {
    console.log(currentSetting);
    this.setState({
      currentSetting
    });
  };

  // used to set the "current setting" color
  settingsMatch = () => {
    // get vars
    const curr = this.state.currentSetting.toLowerCase();
    const vote = this.state.votedOption.title.toLowerCase();
    const pop = this.props.question.topOption.title.toLowerCase();
    const { condition } = this.props;

    // condition 2
    if (condition === 2) {
      if (curr === vote) {
        this.state.status = 'OK';
        return this.MatchEnum.OK;
      }
      if (vote === 'Not sure') {
        this.state.status = 'WARNING';
        return this.MatchEnum.WARNING;
      }
    }

    // condition 3
    if (condition === 3) {
      if (curr === pop && pop === vote) {
        this.state.status = 'OK';
        return this.MatchEnum.OK;
      }
      if (curr === pop && vote === 'Not sure') {
        this.state.status = 'OK';
        return this.MatchEnum.OK;
      }
      if (curr === pop || pop === vote || vote === curr) {
        this.state.status = 'WARNING';
        return this.MatchEnum.WARNING;
      }
    }
    this.state.status = 'ALERT';
    return this.MatchEnum.ALERT;
  };

  // called when user selects an option
  handleVoted = option => {
    this.setState({
      voteSubmitted: true,
      votedOption: option
    });
  };

  // login to Facebook, don't require info
  loginAndRedirect = url => {
    mixpanel.track("Clicked Change in Checkup", {
      question: this.props.question.title,
      voted: this.state.votedOption.title,
      current_setting: this.state.currentSetting,
      most_popular: this.props.question.topOption.title
    });
    window.open(url, '_blank');
  };

  showGraph = () => {
    this.setState(prevState => ({ showGraph: !prevState.showGraph }));
  };

  renderSelected = () => (
    <p className="selected">
      You chose&nbsp; <span>{this.state.votedOption.title}</span>
    </p>
  );

  // TODO: rewrite this! so ugly.
  renderCurrentSetting = () => {
    if (this.state.currentSetting) {
      const match = this.settingsMatch();
      if (match === this.MatchEnum.OK) {
        return (
          <p className="current-ok">
            Your current setting on Facebook is{' '}
            <span className="current-important ok">
              {this.state.currentSetting}
            </span>
          </p>
        );
      }
      if (match === this.MatchEnum.WARNING) {
        return (
          <p className="current-warning">
            Your current setting on Facebook is{' '}
            <span className="current-important warning">
              {this.state.currentSetting}
            </span>
          </p>
        );
      }
      return (
        <p className="current-alert">
          Your current setting on Facebook is{' '}
          <span className="current-important alert">
            {this.state.currentSetting}
          </span>
          . Would you like to change it?
        </p>
      );
    }
    return (
      <div className="center">
        <ReactLoading type="bubbles" color="#4468B0" height="7%" width="7%" />
      </div>
    );
  };


  renderSeeOthers = () => {
    return (
      <button className="fb-see-others"
        onClick={() => {
          mixpanel.time_event("See Others");
          this.setState({ prevOthersShown: true });
          this.setState({ showGraph: true });
        }}>
        <b><MaterialIcon icon="chevron_right" size={20}/></b>
        See what others think
      </button>
    )
  }

  renderCrowdChoice = () => {
    const { topOption, totalVotes } = this.props.question;
    const percentage = ((topOption.count / totalVotes) * 100).toFixed(0);
    return (
      <div>
        <p
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          //role="button"
          //onClick={() => this.showGraph()}
          //onKeyDown={() => {}}
          className="crowd-choice"
        >
          <span className="ans-important percent" id="ans-percent">
            {percentage}&#37;{' '}
          </span>{' '}
          of people think
          <span className="ans-important option" id="ans-crowd">
            {' '}
            {topOption.title}{' '}
          </span>
          is the safest option
        </p>
        {this.state.showGraph && (
          <p className="graph">
            <HBarGraph height="20" question={this.props.question} />
          </p>
        )}
      </div>
    );
  };
  /*
  goBack = () => {
     window.open(`${this.props.history.location}`);
  };

  goBack(){
    this.props.history.goBack;
  }*/

  renderActionButtons = () => (
   <div className="back-button">
      {/*<button
        id="action-back"
          onClick={() => this.goBack()

        }

      >
        Back
      </button> */}

      <button
        id="action-next"
        onClick={() => {
          if (this.state.prevOthersShown) {
            mixpanel.track("See Others", {
              question: this.props.question.title,
              voted: this.state.votedOption.title,
              current_setting: this.state.currentSetting});
            if (this.state.votedOption.title.toLowerCase() !== this.props.question.topOption.title.toLowerCase()
                && !this.state.fbChanged) {
              mixpanel.track("Disagreement", {
                question: this.props.question.title,
                voted: this.state.votedOption.title,
                most_popular: this.props.question.topOption.title
              });
            }
            this.setState({ prevOthersShown: false });
          }

          mixpanel.track("Question Time", {question: this.props.question.title});
          this.props.submitVote(
            this.props.question,
            this.state.votedOption,
            this.state.currentSetting,
            this.state.clickedChange,
            (this.props.question.scrapeTag === 3)   // CHECK IF LAST QUESTION
          )
        }
        }
      >
        Next
      </button>
    </div>
  );

  renderChangeFacebook = () => {
    if (this.state.currentSetting) {
      const match = this.settingsMatch();
      if (match === this.MatchEnum.OK) {
        return (
          <button
            onClick={() => {
              this.setState({ clickedChange: true });
              this.loginAndRedirect(this.props.question.url);
            }}
            id="action-fb-ok"
          >
            Change this setting on Facebook
          </button>
        );
      }
      if (match === this.MatchEnum.WARNING) {
        return (
          <button
            onClick={() => {
              this.setState({ clickedChange: true });
              this.loginAndRedirect(this.props.question.url);
            }}
            id="action-fb-warning"
          >
            Change this setting on Facebook
          </button>
        );
      }
      return (
        <button
          onClick={() => {
            this.setState({ clickedChange: true });
            this.loginAndRedirect(this.props.question.url);
          }}
          id="action-fb-alert"
        >
          Change this setting on Facebook
        </button>
      );
    }
    return '';
    // return (
    //   <div className="center">
    //     <ReactLoading type="bubbles" color="#4468B0"
    // height="7%" width="7%" />
    //   </div>
    // );
  };

  // renderStats = () => (
  //   <div>
  //     <BarHorizontalChart
  //       data={this.getStats()}
  //       width={400}
  //       height={200}
  //       margin={{ top: 20, bottom: 0, left: 20, right: 0 }}
  //     />
  //   </div>
  // );

  // renders each option
  renderUnvoted = () => (
    <div className="fb-opt-list">
      <ul>
        {this.props.question.options.map(opt => (
          <li key={opt._id}>
            <Option option={opt} handleVoted={this.handleVoted} />
          </li>
        ))}
      </ul>
    </div>
  );

  renderDescription = () => (
    <div className="fb-description">{this.props.question.description}</div>
  );

  renderNone = () => {};

  render() {
    mixpanel.time_event("Question Time");
    return (
      <div className="fb-question">
        <iframe title="iframe" id="iframe" style={{ display: 'none' }} />
        <div className="fb-title">
            <b className="fb-category">Category:&nbsp;{this.props.question.category}</b><br />
            {this.props.question.title}<br />
        </div>
        <details>
          <summary className="info-icon">
            <span className="info-icon"
              onClick={() => mixpanel.track("Description Shown", {question: this.props.question.title})}
            >
              <MaterialIcon icon="info" size={17}/>
              &nbsp;What does this mean?</span>
          </summary>
          <div className="fb-description">{this.props.question.description}</div>
        </details>
        {!this.state.voteSubmitted && (
          <div className="fb-description">
            <br /><b>Please choose an option:</b>
          </div>
        )}
        {this.state.voteSubmitted ? this.getMaxVote() : this.renderUnvoted()}
      </div>
    );
  }
}

export default Question;
