import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './../lib/index.js';
/* import Calendar from 'react-github-contribution-calendar'; */

(() => {
  var values = {
    '2016-06-23': 1,
    '2016-06-26': 2,
    '2016-06-27': 3,
    '2016-06-28': 4,
    '2016-06-29': 4
  }
  var until = '2016-06-30';

  var elem = document.getElementById('app');
  ReactDOM.render(<Calendar values={values} until={until} />, elem);
})();


(() => {
  var values = {
    '2016-06-23': 1,
    '2016-06-26': 2,
    '2016-06-27': 3,
    '2016-06-28': 4,
    '2016-06-29': 4
  }
  var until = '2016-06-30';

  var elem = document.getElementById('example1');
  ReactDOM.render(<Calendar values={values} until={until} />, elem);
})();
