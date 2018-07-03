import React, { Component } from "react";
import Option from "../Option/Option";
//css
import "./Question.css";
import "../../assets/font.css";

export class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voteSubmitted: false,
      userOpt: ""
    };
  }

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
          {this.props.options.map(opt => (
            <li key={opt._id}>
              <Option
                _id={opt._id}
                title={opt.title}
                count={opt.count}
                handleVoted={this.handleVoted}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  getMaxVote = () => {
    var max = 0;
    var maxTitle = "";
    var sum = 0;
    for (var i in this.props.options) {
      var op = this.props.options[i];
      sum += op.count;
      if (op.count > max) {
        max = op.count;
        maxTitle = op.title;
      }
    }
    const percentage = ((max / sum) * 100).toFixed(2);
    return (
      <div>
        <p>
          your choice is: <span id="ans-user">{this.state.userOpt}</span>
          <br />
          <span id="ans-percent">{percentage}</span>% of people think
          <span id="ans-crowd">{maxTitle}</span> is the best option
        </p>
      </div>
    );
  };

  render() {
    return (
      <div className="fb-question">
        <div className="fb-title">{this.props.title}</div>
        {this.state.voteSubmitted ? this.getMaxVote() : this.renderUnvoted()}
      </div>
    );
  }
}

export default Question;
