/*
 * File: Question.jsx
 * Project: Chrome New Tab
 * File Created: Friday, July 6 2018, 11:01 am
 * Description: Question component, uses state
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Friday, 13th July 2018 4:12:56 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Option from './Option/Option';
import {BarChart} from '../../../../node_modules/react-d3-components/lib/';


// css
import './Question.scss';

import '../../assets/font.css';



export class Question extends Component {
  static propTypes = {
    answered: PropTypes.bool.isRequired,
    question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
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

    this.state = {
      voteSubmitted: props.answered,
      votedOption: null,
      dummydata: [{
        label: 'somethingA',
        values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
      }]
    };
  }

  getStats = () => {
    const getPercent = opt => {
      var p = ((opt.count /
        this.props.question.totalVotes) * 100).toFixed(0);
      return parseInt(p);
    } 
    var ops = this.props.question.options.map(opt => 
      ({'title': opt.title, 'percent': getPercent(opt)})
    );
    var res = [{label: 'somethingA', values: ops}];
    console.log(res);
    return res;
  }
  

  renderStats = () => {
    //getStats should be correct
    {this.getStats()}

    return (
      <div>
        <BarChart
        // data={this.getStats()}
        data={this.state.dummydata}
        width={400}
        height={300}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
       </div>
    );

    }

    // this.props.question.options.map(opt => (
    //   <div key={opt._id}>
    //     {opt.title}:{' '}
    //     {((opt.count / this.props.question.totalVotes) * 100).toFixed(0)}&#37;
    //   </div>
    // ));

  getMaxVote = () => {
    const { topOption, totalVotes } = this.props.question;

    // FIXME: diplay something else when first person votes
    const percentage = ((topOption.count / totalVotes) * 100).toFixed(0);

    return (
      <div>
        {/* <iframe
          title="facebook"
          id="iframe"
          frameBorder="0"
          sandbox="allow-same-origin allow-scripts"
        /> */}
        <div id="test" />
        <p className="ans">
          Your have selected{' '}
          <span className="ans-important" id="ans-user">
            {this.state.votedOption.title}
          </span>
          <br />
          {/* in case there are no votes for this question */}
          {percentage > 0 && (
            <span>
              <span className="ans-important" id="ans-percent">
                {percentage}&#37;
              </span>{' '}
              of people think
              <span className="ans-important" id="ans-crowd">
                {' '}
                {topOption.title}{' '}
              </span>
              is the best option
            </span>
          )}
        </p>
        <div className="action-buttons">
          <button
            id="action-next"
            onClick={() =>
              this.props.submitVote(this.props.question, this.state.votedOption)
            }
          >
            Next Question
          </button>
          {/* <br /> */}
          <button
            onClick={() => this.loginAndRedirect(this.props.question.url)}
            id="action-fb"
          >
            Change my setting on Facebook
          </button>
        </div>
        {this.renderStats()}
      </div>
    );
  };

  // login to Facebook, don't require info
  loginAndRedirect = url => {
    Meteor.loginWithFacebook({ requestPermissions: [] }, function(err) {
      if (err) {
        console.error(err);
      } else {
        // window.open(url, '_blank');
        Meteor.call('testMethod', url, (error, result) => {
          console.log(result);
          document.getElementById('test').innerHTML = result.content;
        });
      }
    });
  };

  // called when user selects an option
  handleVoted = option => {
    this.setState({
      voteSubmitted: true,
      votedOption: option
    });
  };

  

  // renders each option
  renderUnvoted = () =>  {
    return (
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
  }

  render() {
    return (
      <div className="fb-question">
        <div className="fb-title">{this.props.question.title}</div>
        <div className="fb-description">{this.props.question.description}</div>
        {this.state.voteSubmitted ? this.getMaxVote() : this.renderUnvoted()} 
      </div>
    );
  }
}

export default Question;
