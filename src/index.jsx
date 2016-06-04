import React, {propTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import elementResizeDetectorMaker from "element-resize-detector";

export default class GitHubCalendar extends React.Component {
  constructor() {
    super();

    this.monthLabelHeight = 15;
    this.weekLabelWidth = 15;
    this.panelSize = 11;
    this.panelMargin = 2;

    this.weekNames = ['', 'M', '', 'W', '', 'F', ''];
    this.monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.panelColors = ['#EEE', '#DDD', '#AAA', '#444'];

    // handle resize
    this.elementResizeDetector = elementResizeDetectorMaker({ strategy: "scroll" });
    this.resizeHandler = () => this.updateSize();

    this.state = {
      columns: 53,
      maxWidth: 53
    }
  }

  getPanelPosition(row, col) {
    var bounds = this.panelSize + this.panelMargin;
    return {
      x: this.weekLabelWidth + bounds * row,
      y: this.monthLabelHeight + bounds * col
    };
  }

  makeCalendarData(history, lastDay, columns) {
    var lastWeekend = new Date(lastDay);
    lastWeekend.setDate(lastWeekend.getDate() + (6 - lastWeekend.getDay()));

    var _endDate = moment(lastDay, 'YYYY-MM-DD');
    _endDate.add(1, 'days');
    _endDate.subtract(1, 'milliseconds');

    var result = [];
    for (var i = 0; i < columns; i++) {
      result[i] = [];
      for (var j = 0; j < 7; j++) {
        var date = new Date(lastWeekend);
        date.setDate(date.getDate() - ((columns - i - 1) * 7 + (6 - j)));

        var momentDate = moment(date);
        if (momentDate < _endDate) {
          var key = momentDate.format('YYYY-MM-DD');
          result[i][j] = {
            value: history[key] || 0,
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
    this.elementResizeDetector.listenTo(
      this.refs.calendarContainer,
      this.resizeHandler);
    this.updateSize();
  }

  componentWillUnmount() {
    this.elementResizeDetector.uninstall(this.refs.calendarContainer);
  }

  render() {
    var columns = this.state.columns;
    var contribHistory = this.props.history;
    var contributions = this.makeCalendarData(
      contribHistory, this.props.last, columns);
    var innerDom = [];

    // panels
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < 7; j++) {
        var contribution = contributions[i][j];
        if (contribution === null) continue;
        var pos = this.getPanelPosition(i, j);
        var color = this.panelColors[contribution.value];

        innerDom.push(React.DOM.rect({
          key: 'panel_key_' + i + '_' + j,
          x: pos.x,
          y: pos.y,
          width: this.panelSize,
          height: this.panelSize,
          fill: color
        }, null));
      }
    }

    // week texts
    for (var i = 0; i < this.weekNames.length; i++) {
      var textBasePos = this.getPanelPosition(0, i);
      innerDom.push(React.DOM.text({
        key: 'week_key_' + i,
        className: 'week',
        x: textBasePos.x - this.panelSize / 2 - 2,
        y: textBasePos.y + this.panelSize / 2,
        textAnchor: 'middle'
      }, this.weekNames[i]));
    }

    // month texts
    var prevMonth = -1;
    for (var i = 0; i < columns; i++) {
      if (contributions[i][0] === null) continue;
      var month = contributions[i][0].date.getMonth();
      if (month != prevMonth) {
        var textBasePos = this.getPanelPosition(i, 0);
        innerDom.push(React.DOM.text({
          key: 'month_key_' + i,
          className: 'month',
          x: textBasePos.x + this.panelSize / 2,
          y: textBasePos.y - this.panelSize / 2 - 2,
          textAnchor: 'middle'
        }, this.monthNames[month]));
      }
      prevMonth = month;
    }

    return (
      <div ref="calendarContainer" className="calendar-wrapper">
        <svg className="calendar" height="110">
          {innerDom}
        </svg>
      </div>
    );
  }

  updateSize() {
    var width = this.refs.calendarContainer.offsetWidth;
    var visibleWeeks = Math.floor((width - this.weekLabelWidth) / 13);
    this.setState({
      columns: Math.min(visibleWeeks, this.state.maxWidth)
    });
  }
};

GitHubCalendar.propTypes = {
  history: React.PropTypes.object,
  last: React.PropTypes.string,
};
