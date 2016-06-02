import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

const makeThrottle = function(func, interval) {
  let lastTime = new Date().getTime() - interval;
  return () => {
    let now = new Date().getTime();
    if ((lastTime + interval) <= now) {
      lastTime = now;
      func();
    }
  };
};

export default class GitHubCalendar extends React.Component {
  constructor() {
    super();

    this.margin_top = 15;
    this.margin_left = 15;
    this.panel_size = 11;
    this.panel_margin = 2;

    this.week_names = ['', 'M', '', 'W', '', 'F', ''];
    this.month_names = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.panel_colors = ['#EEE', '#DDD', '#AAA', '#444'];

    this.resizeHandler = makeThrottle(() => this.updateSize(), 100);

    this.state = {
      columns: 54,
      maxWidth: 54
    }
  }

  getPanelPosition(row, col) {
    var outer_size = this.panel_size + this.panel_margin;
    return {
      x: this.margin_left + outer_size * row,
      y: this.margin_top + outer_size * col
    };
  }

  makeCalendarData(history, last_day, columns) {
    var last_weekend = new Date(last_day);
    last_weekend.setDate(last_weekend.getDate() + (6 - last_weekend.getDay()));

    var _end_date = moment(last_day, 'YYYY-MM-DD');
    _end_date.add(1, 'days');
    _end_date.subtract(1, 'milliseconds');

    var result = [];
    for (var i = 0; i < columns; i++) {
      result[i] = [];
      for (var j = 0; j < 7; j++) {
        var date = new Date(last_weekend);
        date.setDate(date.getDate() - ((columns - i - 1) * 7 + (6 - j)));

        var moment_date = moment(date);
        if (moment_date < _end_date) {
          var history_key = moment_date.format('YYYY-MM-DD');
          result[i][j] = {
            value: history[history_key] || 0,
            date: date
          };
        } else {
          result[i][j] = null;
        }
      }
    }

    return result;
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    this.updateSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  render() {
    var columns = this.state.columns;
    var contrib_history = this.props.contrib_history;
    var contributions = this.makeCalendarData(
      contrib_history, this.props.last_day, columns);
    var inner_dom = [];

    // panels
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < 7; j++) {
        var contribution = contributions[i][j];
        if (contribution === null) continue;
        var pos = this.getPanelPosition(i, j);
        var color = this.panel_colors[contribution.value];

        inner_dom.push(React.DOM.rect({
          key: 'panel_key_' + i + '_' + j,
          x: pos.x,
          y: pos.y,
          width: this.panel_size,
          height: this.panel_size,
          fill: color
        }, null));
      }
    }

    // week texts
    for (var i = 0; i < this.week_names.length; i++) {
      var text_base_pos = this.getPanelPosition(0, i);
      inner_dom.push(React.DOM.text({
        key: 'week_key_' + i,
        className: 'week',
        x: text_base_pos.x - this.panel_size / 2 - 2,
        y: text_base_pos.y + this.panel_size / 2,
        textAnchor: 'middle'
      }, this.week_names[i]));
    }

    // month texts
    var prev_month = -1;
    for (var i = 0; i < columns; i++) {
      if (contributions[i][0] === null) continue;
      var month = contributions[i][0].date.getMonth();
      if (month != prev_month) {
        var text_base_pos = this.getPanelPosition(i, 0);
        inner_dom.push(React.DOM.text({
          key: 'month_key_' + i,
          className: 'month',
          x: text_base_pos.x + this.panel_size / 2,
          y: text_base_pos.y - this.panel_size / 2 - 2,
          textAnchor: 'middle'
        }, this.month_names[month]));
      }
      prev_month = month;
    }

    return (
      <div ref="calendarContainer" className="calendar-wrapper">
        <svg className="calendar" width="721" height="110">
          {inner_dom}
        </svg>
      </div>
    );
  }

  updateSize() {
    var width = this.refs.calendarContainer.offsetWidth;
    var visibleWeeks = Math.floor((width - this.margin_left * 2) / 13);
    this.setState({
      columns: Math.min(visibleWeeks, this.state.maxWidth)
    });
  }
};

