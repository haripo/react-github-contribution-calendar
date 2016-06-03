import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './../lib/calendar.js';
/* import Calendar from 'react-github-contribution-calendar'; */

(() => {
  var hist = {
    '2016-06-23': 1,
    '2016-06-26': 2,
    '2016-06-27': 3,
    '2016-06-28': 4,
    '2016-06-29': 4
  }
  var last = '2016-06-30';

  var elem = document.getElementById('app');
  ReactDOM.render(<Calendar history={hist} last={last} />,
                  elem);
})();


(() => {
  var hist = {
    '2016-06-23': 1,
    '2016-06-26': 2,
    '2016-06-27': 3,
    '2016-06-28': 4,
    '2016-06-29': 4
  }
  var last = '2016-06-30';

  var elem = document.getElementById('example1');
  ReactDOM.render(<Calendar history={hist} last={last} />,
                  elem);
})();
