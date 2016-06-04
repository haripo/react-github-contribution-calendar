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

(() => {
  var values = {}
  var until = '2016-12-30';
  var weekNames = ['s', 'm', 't', 'w', 't', 'f', 's'];
  var monthNames = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];

  var elem = document.getElementById('example2');
  ReactDOM.render(<Calendar values={values} until={until}
                  weekNames={weekNames} monthNames={monthNames}/>, elem);
})();
//panelColors: ['#EEE', '#DDD', '#AAA', '#444']
