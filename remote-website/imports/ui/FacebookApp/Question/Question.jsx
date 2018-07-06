import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from '../Option/Option';
// css
import './Question.scss';
import '../../assets/font.css';

export class Question extends Component {
  static propTypes = {
    answered: PropTypes.bool.isRequired,
    question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      options: PropTypes.array.isRequired
    }).isRequired,
    loadNext: PropTypes.func.isRequired,
    userGuid: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      voteSubmitted: props.answered,
      userOpt: ''
    };
  }

  getMaxVote = () => {
    let max = 0;
    let maxTitle = '';
    let sum = 0;
    this.props.question.options.forEach(op => {
      sum += op.count;
      if (op.count > max) {
        max = op.count;
        maxTitle = op.title;
      }
    });
    const percentage = ((max / sum) * 100).toFixed(0);
    return (
      <div>
        <p className="ans">
          Your have selected{' '}
          <span className="ans-important" id="ans-user">
            {this.state.userOpt}
          </span>
          <br />
          <span className="ans-important" id="ans-percent">
            {percentage}&#37;
          </span>{' '}
          of people think
          <span className="ans-important" id="ans-crowd">
            {' '}
            {maxTitle}{' '}
          </span>
          is the best option
        </p>
        <div className="action-buttons">
          {!this.props.answered && (
            <button id="action-next" onClick={() => this.props.loadNext()}>
              Next Question
            </button>
          )}
          {/* <br /> */}
          <button id="action-fb">Change my setting on Facebook</button>
        </div>
      </div>
    );
  };

  handleVoted = title => {
    this.setState({
      voteSubmitted: true,
      userOpt: title
    });
  };

  renderUnvoted() {
    return (
      <div className="fb-opt-list">
        <ul>
          {this.props.question.options.map(opt => (
            <li key={opt._id}>
              <Option
                userGuid={this.props.userGuid}
                questionId={this.props.question._id}
                option={opt}
                handleVoted={this.handleVoted}
              />
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
