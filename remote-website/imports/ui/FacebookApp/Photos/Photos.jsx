/*
 * File: Photos.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 23rd July 2018 11:28:14 am
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

import React from 'react';
import PropTypes from 'prop-types';

import './Photos.scss';
import '../../assets/font.css';

const Photos = ({ amount, width, height }) => {
  const photos = new Array(amount).fill(0);
  return (
    <div className="photos-body">
      {photos.map((elem, index) => {
        const sig = Math.floor(Math.random() * 1000);
        const source = `https://source.unsplash.com/featured/${width}x${height}/?nature,sig=${sig},`;
        return (
          <div key={`pic${sig}${index}`}>
            <img className="photo-item" src={source} alt="" />
          </div>
        );
      })}
    </div>
  );
};

Photos.propTypes = {
  amount: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

Photos.defaultProps = {
  amount: 5,
  width: 300,
  height: 300
};

export default Photos;
