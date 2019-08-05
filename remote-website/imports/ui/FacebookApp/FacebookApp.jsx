/*
 * File: FacebookApp.jsx
 * Project: Chrome New Tab
 * File Created: Friday, July 6 2018, 10:59 am
 * Description: Main component for FacebookApp
 * Path: /facebookapp
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Tue Oct 23 2018
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { graphql, compose } from 'react-apollo';
import { Line } from 'rc-progress';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Question from './Question/Question';
import '../assets/font.css';
import './FacebookApp.scss';
import Wrapper from '../Components/Wrapper/Wrapper';
import Users from '../../api/users/users';
import Menu from './Menu/Menu';
import Thanks from './Thanks/Thanks';
import Closed from './Closed/Closed';

//////// function to connect to mixpanel API -- ignore
(function(c,a) {
  if(!a.__SV) {
    var b=window;
    try {
      var d,m,j,k=b.location,f=k.hash;
      d=function(a,b) { 
        return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null
      };
      f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))
    }
    catch(n){}var l,h;window.mixpanel=a;a._i=[];
    a.init=function(b,d,g) {
      function c(b,i) {
        var a=i.split(".");
        2==a.length&&(b=b[a[0]],i=a[1]);
        b[i]=function() { 
          b.push([i].concat(Array.prototype.slice.call(arguments,0)))
        }
      }
      var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";
      e.people=e.people||[];
      e.toString=function(b) {
        var a="mixpanel";
        "mixpanel"!==g&&(a+="."+g);
        b||(a+=" (stub)");
        return a
      };
      e.people.toString=function() {
        return e.toString(1)+".people (stub)"};
        l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
        for(h=0;h<l.length;h++)c(e,l[h]);
        var f="set set_once union unset remove delete".split(" ");
        e.get_group=function() {
          function a(c){b[c]=function()
            {call2_args=arguments;
              call2=[c].concat(Array.prototype.slice.call(call2_args,0));
              e.push([d,call2])
            }
          }
          for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;
          c<f.length;c++)a(f[c]);return b};
          a._i.push([b,d,g])};a.__SV=1.2;
          b=c.createElement("script");
          b.type="text/javascript";
          b.async=!0;
          b.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
          d=c.getElementsByTagName("script")[0];
          d.parentNode.insertBefore(b,d)
        }
  })(document,window.mixpanel||[]);

  mixpanel.init("19de395ed2da3ff94cdc5525e80ba2f2");
/////////////////////////////////////////////////////////////

export class FacebookApp extends Component {
  static propTypes = {
    history: PropTypes.shape({
      go: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        guid: PropTypes.string
      }).isRequired
    }).isRequired,
    refetch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      responses: PropTypes.array.isRequired
    }),
    loading: PropTypes.bool.isRequired,
    answerQuestion: PropTypes.func.isRequired,
    resetResponses: PropTypes.func.isRequired,
    questions: PropTypes.instanceOf(Array),
    userExists: PropTypes.bool.isRequired
  };

  static defaultProps = {
    user: null,
    questions: []
  };

  constructor(props) {
    super(props);
    // Valid conditions: 2 or 3
    this.condition = 3;
    this.state = { categoryFilter: null, closed: true };
  }

  componentDidMount() {
    Meteor.call('hasCookies', this.props.match.params.guid, (error, result) => {
      console.log(result);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.user === null) return true;
    if (this.state.closed !== nextState.closed) return true;
    if (
      this.props.loading !== nextProps.loading ||
      this.props.userExists !== nextProps.userExists
    ) {
      return true;
    }
    if (this.state.categoryFilter !== nextState.categoryFilter) return true;
    if (this.props.user.responses.length === nextProps.user.responses.length) {
      return false;
    }
    return true;
  }

  getRandomQuestion = max => Math.floor(Math.random() * max);

  handleViewAll = () => {
    mixpanel.track("Clicked View All");
    window.open(`${this.props.history.location.pathname}/summary`, '_blank');
  };

  handleRestart = () => {
    console.log('Restarting...');
    this.props
      .resetResponses({
        variables: {
          guid: this.userGuid
        }
      })
      .then(data => {
        console.log(data);
        this.setState({
          closed: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  logoutAndClear = () => {
    // log user out
    Meteor.call('clearCookies', this.userGuid, () => {
      window.open('https://www.facebook.com', '_blank');
    });
  };

  // called when user advances to the next question
  submitVote = (question, option, currentSetting, clickedChange, isLastQuestion) => {
    if (isLastQuestion) {
      mixpanel.track("Checkup Ended");
      mixpanel.track("Checkup Time");
    }
    const { condition } = this;
    this.props
      .answerQuestion({
        variables: {
          guid: this.userGuid,
          questionId: question._id,
          optionId: option._id,
          currentSetting,
          condition,
          clickedChange
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  toggleClosed = () => {
    this.setState(prevState => ({
      closed: !prevState.closed
    }));
  };

  filterByCategory = category => {
    console.log(category);
    this.setState({ categoryFilter: category });
  };

  renderQuestion = (q, numUnanswered, numQuestions) => {
    if (numUnanswered === numQuestions) {
      mixpanel.time_event("Checkup Time");
      mixpanel.track("Checkup Started");
    }
    if (q) {
      return (
        <Question
          submitVote={this.submitVote}
          key={q._id}
          condition={this.condition}
          question={q}
          userGuid={this.userGuid}
          answered={false}
        />
      );
    }

    return <div>Thanks for participating!</div>;
  };

  

  render() {
    mixpanel.identify(this.userGuid) // identify user by guid on mixPanel
    mixpanel.people.set_once({ "User ID": this.userGuid })

    if (this.props.loading || !this.props.userExists) {
      return '';
    }

    // ids of questions answered
    const answeredIds = this.props.user.responses.map(res => res.questionId);

    // functions to filter questions
    const contains = _id => answeredIds.indexOf(_id) > -1;
    const catFilter = (q, cat) => (cat ? q.category === cat : true);

    // get unique categories from questions
    const categories = this.props.questions
      .map(q => q.category)
      // .filter(category => category !== this.state.categoryFilter)
      .filter(function(item, i, ar) {
        return ar.indexOf(item) === i;
      });

    // get questions that belong to selected category
    const filteredQuestions = this.props.questions.filter(q =>
      catFilter(q, this.state.categoryFilter)
    );

    // get questions that have NOT been answered
    const unansweredQuestions = filteredQuestions.filter(q => !contains(q._id));

    const percent =
      ((this.props.questions.length - unansweredQuestions.length + 1) / this.props.questions.length) * 100;

    const barcolor = () => {
      if (percent < 33) {
        return '#95c1e5';
      } else if (percent > 66) {
        return '#0f74d8';
      }
      return '#589ff4';
    };

    // get userGuid from URL
    this.userGuid = this.props.match.params.guid;
    if (this.userGuid === undefined) {
      return 'Please use the Chrome Extension!';
    }

    // there are questions to answer, display a random one
    const numQuestions = unansweredQuestions.length;

    if (numQuestions === 0 && this.state.categoryFilter) {
      // TODO: App shouldn't end...
      console.log('No more questions on this category!');
      this.setState({
        categoryFilter: null
      });
      return '';
    }

    //const questionToRender = unansweredQuestions[this.getRandomQuestion(numQuestions)];

    // TODO: used for test only
    const questionToRender = unansweredQuestions[0];

    const { closed } = this.state;

    return (
      <Wrapper>
        {questionToRender ? (
          closed ? (
            <Thanks
              guid={this.userGuid}
              handleViewAll={this.handleViewAll}
              handleRestart={this.toggleClosed}
              logout={this.logoutAndClear}
              done={false}
            />
          ) : (
            <div className="grid-wrapper">
              <div className="grid-sidebar">
                <Menu
                  selectedCategory={this.state.categoryFilter}
                  filter={this.filterByCategory}
                  categories={categories}
                  history={this.props.history}
                  logout={this.logoutAndClear}
                />
              </div>
              <div className="grid-content">
                <Line
                  percent={percent}
                  strokeWidth="2"
                  strokeColor={barcolor()}
                />
                {this.renderQuestion(questionToRender, unansweredQuestions.length, this.props.questions.length)}
              </div>
            </div>
          )
        ) : (
          // TODO: change this to be more useful!
          <Thanks
            guid={this.userGuid}
            handleViewAll={this.handleViewAll}
            handleRestart={this.handleRestart}
            logout={this.logoutAndClear}
            done
          />
        )}
      </Wrapper>
    );
  }
}

// mutation used to submit vote to database
const answerQuestion = gql`
  mutation answerQuestion(
    $guid: String!
    $questionId: ID!
    $optionId: ID!
    $currentSetting: String
    $condition: Int
    $clickedChange: Boolean
  ) {
    answerQuestion(
      guid: $guid
      questionId: $questionId
      optionId: $optionId
      currentSetting: $currentSetting
      condition: $condition
      clickedChange: $clickedChange
    ) {
      responses {
        question {
          title
          _id
        }
        option {
          title
          _id
          count
        }
      }
    }
  }
`;

// mutation used to submit vote to database
const resetResponses = gql`
  mutation resetResponses($guid: String!) {
    resetResponses(guid: $guid) {
      responses {
        question {
          title
          _id
        }
        option {
          title
          _id
          count
        }
      }
    }
  }
`;

// query used to fetch questions from database
const questionsQuery = gql`
  query Questions {
    questions {
      _id
      title
      category
      description
      url
      scrapeTag
      totalVotes
      topOption {
        title
        count
      }
      options {
        _id
        title
        count
      }
    }
  }
`;

// pre-populate props using graphql and withTracker
export default compose(
  graphql(questionsQuery, {
    props: ({ data }) => ({ ...data })
  }),
  graphql(resetResponses, {
    name: 'resetResponses'
  }),
  graphql(answerQuestion, {
    name: 'answerQuestion'
  }),
  withTracker(props => {
    const usersHandle = Meteor.subscribe('users');
    const loading = !usersHandle.ready();
    const user = Users.findOne({ guid: props.match.params.guid });
    const userExists = !loading && !!user;
    return {
      user,
      userExists
    };
  })
)(FacebookApp);
