react-github-contribution-calendar
====

[![npm version](https://badge.fury.io/js/react-github-contribution-calendar.svg)](https://badge.fury.io/js/react-github-contribution-calendar)

A responsive react component for GitHub-like heatmap calendar

## Demo

[Demo and documents](http://haripo.github.io/react-github-contribution-calendar/)

## Usage

``` javascript
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-github-contribution-calendar';

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
```

## Install

``` npm i react-github-contribution-calendar --save ```

## Licence

MIT

## Author

[haripo](https://github.com/haripo)
