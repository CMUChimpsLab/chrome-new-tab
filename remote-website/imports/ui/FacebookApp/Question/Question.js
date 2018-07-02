import React, { Component } from "react";
import Option from "../Option/Option";

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
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
      <ul>
        {this.props.options.map(opt => (
          <Option
            key={opt._id}
            _id={opt._id}
            title={opt.title}
            count={opt.count}
            handleVoted={this.handleVoted}
          />
        ))}
      </ul>
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
      <p>
        your choice is: {this.state.userOpt}
        <br />
        {percentage} % of people think {maxTitle} is the best option
      </p>
    );
  };

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        {this.state.voteSubmitted ? this.getMaxVote() : this.renderUnvoted()}
      </div>
    );
  }
}

export default Question;
