/*
 * File: HBarGraph.jsx
 * Project: Chrome New Tab
 * File Created: Thursday, 23rd August 2018 9:24:23 am
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React from 'react';
import PropTypes from 'prop-types';

import './HBarGraph.scss';
import '../../../assets/font.css';

const HBarGraph = props => {
  // helper func
  const getPercent = opt => {
    const p = ((opt.count / props.question.totalVotes) * 100).toFixed(0);
    return parseInt(p, 10);
  };

  const filteredOptions = props.question.options.filter(
    opt => opt.title !== 'Not sure'
  );
  // return ops;

  return (
    <div className="graph-box">
      {filteredOptions.map(opt => {
        const normalPercent = getPercent(opt) * 0.8;
        return (
          <div className="graph-bar">
            <span className="label">{opt.title}</span>
            <svg width="100%" height="30">
              <g>
                <rect
                  width={`${normalPercent}%`}
                  height="30"
                  style={{
                    fill: 'rgb(31, 119, 180)'
                  }}
                />
                <text
                  x={`${normalPercent + 1}%`}
                  y="20"
                  fontSize="1em"
                  fontWeight="200"
                  fill="#747474"
                >
                  {opt.count} votes
                </text>
              </g>
            </svg>
          </div>
        );
      })}

      <span className="data-source">
        <b>Source</b>: Amazon Mechanical Turk, August 2018
      </span>
    </div>
  );
};

HBarGraph.propTypes = {
  question: PropTypes.shape({
    totalVotes: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired
  }).isRequired
};

export default HBarGraph;
