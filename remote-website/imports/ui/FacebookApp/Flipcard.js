import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export class FlipCard extends Component {
  getInitialState() {
    return {
      isFlipped: false
    };
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }

  render() {
    return (
      <div>
        {/*
            The `disabled` attribute allows turning off the auto-flip
            on hover, or focus. This allows manual control over flipping.
  
            The `flipped` attribute indicates whether to show the front,
            or the back, with `true` meaning show the back.
          */}
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
          onFlip={this.handleOnFlip}
          onKeyDown={this.handleKeyDown}
        >
          <div>
            <div>Front</div>
            <button type="button" onClick={this.showBack}>
              Show back
            </button>
            <div>
              <small>(manual flip)</small>
            </div>
          </div>
          <div>
            <div>Back</div>
            <button type="button" ref="backButton" onClick={this.showFront}>
              Show front
            </button>
          </div>
        </FlipCard>
      </div>
    );
  }
}

export default FlipCard;
