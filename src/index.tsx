import React from 'react';
import moment from 'moment';

// @ts-ignore
import elementResizeDetectorMaker from "element-resize-detector";

interface Props {
  weekNames: string[]
  monthNames: string[]
  panelColors: string[]
  values: { [date: string]: number }
  until: string
}

interface State {
  columns: number
  maxWidth: number
}

export default class GitHubCalendar extends React.Component<Props, State> {
  monthLabelHeight: number;
  weekLabelWidth: number;
  panelSize: number;
  panelMargin: number;

  elementResizeDetector: any;
  resizeHandler: any;

  // static state = {
  //   columns: 53,
  //   maxWidth: 53
  // };

  constructor(props: any) {
    super(props);

    this.monthLabelHeight = 15;
    this.weekLabelWidth = 15;
    this.panelSize = 11;
    this.panelMargin = 2;

    // handle resize
    this.elementResizeDetector = elementResizeDetectorMaker({ strategy: "scroll" });
    this.resizeHandler = () => this.updateSize();

    this.state = {
      columns: 53,
      maxWidth: 53
    }
  }

  getPanelPosition(row: number, col: number) {
    const bounds = this.panelSize + this.panelMargin;
    return {
      x: this.weekLabelWidth + bounds * row,
      y: this.monthLabelHeight + bounds * col
    };
  }

  makeCalendarData(history: { [k: string]: number }, lastDay: string, columns: number) {
    var lastWeekend = new Date(lastDay);
    lastWeekend.setDate(lastWeekend.getDate() + (6 - lastWeekend.getDay()));

    var _endDate = moment(lastDay, 'YYYY-MM-DD');
    _endDate.add(1, 'days');
    _endDate.subtract(1, 'milliseconds');

    var result: ({ value: number, date: Date } | null)[][] = [];
    for (var i = 0; i < columns; i++) {
      result[i] = [];
      for (var j = 0; j < 7; j++) {
        // @ts-ignore
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
    const columns = this.state.columns;
    const values = this.props.values;
    const until = this.props.until;

    var contributions = this.makeCalendarData(values, until, columns);
    var innerDom = [];

    // panels
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < 7; j++) {
        var contribution = contributions[i][j];
        if (contribution === null) continue;
        const pos = this.getPanelPosition(i, j);
        const color = this.props.panelColors[contribution.value];
        const dom = (
          <rect
            key={ 'panel_key_' + i + '_' + j }
            x={ pos.x }
            y={ pos.y }
            width={ this.panelSize }
            height={ this.panelSize }
            fill={ color }
          />
        );
        innerDom.push(dom);
      }
    }

    // week texts
    for (var i = 0; i < this.props.weekNames.length; i++) {
      const textBasePos = this.getPanelPosition(0, i);
      const dom = (
        <text
          key={ 'week_key_' + i }
          style={{
            fontSize: 9,
            alignmentBaseline: 'central',
            fill: '#AAA'
          }}
          x={ textBasePos.x - this.panelSize / 2 - 2 }
          y={ textBasePos.y + this.panelSize / 2 }
          textAnchor={ 'middle' }>
          { this.props.weekNames[i] }
        </text>
      );
      innerDom.push(dom);
    }

    // month texts
    var prevMonth = -1;
    for (var i = 0; i < columns; i++) {
      const c = contributions[i][0];
      if (c === null) continue;
      var month = c.date.getMonth();
      if (month != prevMonth) {
        var textBasePos = this.getPanelPosition(i, 0);
        innerDom.push(<text
            key={ 'month_key_' + i }
            style={{
              fontSize: 10,
              alignmentBaseline: 'central',
              fill: '#AAA'
            }}
            x={ textBasePos.x + this.panelSize / 2 }
            y={ textBasePos.y - this.panelSize / 2 - 2 }
            textAnchor={ 'middle' }>
            { this.props.monthNames[month] }
          </text>
        );
      }
      prevMonth = month;
    }

    return (
      <div ref="calendarContainer" style={ { width: "100%" } }>
        <svg
          style={ {
            fontFamily: 'Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif',
            width: '100%'
          } }
          height="110">
          { innerDom }
        </svg>
      </div>
    );
  }

  updateSize() {
    // @ts-ignore
    var width = this.refs.calendarContainer.offsetWidth;
    var visibleWeeks = Math.floor((width - this.weekLabelWidth) / 13);
    this.setState({
      columns: Math.min(visibleWeeks, this.state.maxWidth)
    });
  }
};

// @ts-ignore
GitHubCalendar.defaultProps = {
  weekNames: ['', 'M', '', 'W', '', 'F', ''],
  monthNames: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  panelColors: ['#EEE', '#DDD', '#AAA', '#444']
};
