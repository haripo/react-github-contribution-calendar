import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './../lib/calendar.js';
/* import Calendar from 'react-github-contribution-calendar'; */

var hist = {
  '2010-01-02': 3,
  '2010-01-01': 2
}

var appElem = document.getElementById('app');
var last = '2010-02-01';

ReactDOM.render(<Calendar history={hist} last={last} />,
                appElem);

