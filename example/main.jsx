import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './../lib/index.js';
/* import Calendar from 'react-github-contribution-calendar'; */

(() => {
  var values = {};
  var pad = (v) => (v < 10 ? '0' + v : v)
  for (var i = 1; i <= 12; i++) {
    for (var j = 1; j <= 31; j++) {
      values['2016-' + pad(i) + '-' + pad(j)] = Math.floor(Math.random() * 5);
    }
  }
  var until = '2016-12-31';
  var panelColors = ['#EEEEEE', '#D6E685', '#8CC665', '#44A340', '#1E6823'];

  var elem = document.getElementById('app');
  ReactDOM.render(<Calendar values={values} until={until} panelColors={panelColors}/>,
                  elem);
})();


(() => {
  var values = {}
  var until = '2016-06-30';
  var values = {
    '2016-06-23': 1,
    '2016-06-26': 2,
    '2016-06-27': 3,
    '2016-06-28': 4,
    '2016-06-29': 4
  };
  var panelColors = ['#EEEEEE', '#F78A23', '#F87D09', '#AC5808', '#7B3F06'];

  var elem = document.getElementById('example1');
  ReactDOM.render(<Calendar values={values} until={until}
                            panelColors={panelColors}/>, elem);
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

(() => {
  var values = {}
  var until = '2016-12-30';
  var panelAttributes = { 'rx': 6, 'ry': 6 };
  var weekLabelAttributes = {
    'rotate': 20
  };
  var monthLabelAttributes = {
    'style': {
      'text-decoration': 'underline',
      'font-size': 10,
      'alignment-baseline': 'central',
      'fill': '#AAA'
    }
  };

  var elem = document.getElementById('example3');
  ReactDOM.render(<Calendar
    values={values}
    until={until}
    panelAttributes={panelAttributes}
    weekLabelAttributes={weekLabelAttributes}
    monthLabelAttributes={monthLabelAttributes}
  />, elem);
})();
