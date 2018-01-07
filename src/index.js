// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import FancyInput from './FancyInput';
import './index.css';

const mountpoint = document.getElementById('root');

if (!mountpoint) {
  throw new Error(`Can't mount the application on the selected node`);
}

ReactDOM.render(
  <FancyInput
    autoFocus
    maxLength={20}
    onChange={value => console.log(value)}
  />,
  mountpoint
);
