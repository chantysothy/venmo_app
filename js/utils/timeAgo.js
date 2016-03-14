var React = require('react-native');
var {
  PropTypes,
  Text
} = React;
var moment = require('moment');
var TimerMixin = require('react-timer-mixin');

function fromNowShortHandHelper(t){
  var now = moment();
  var daysDiff = now.diff(moment(t), 'days');
  var hoursDiff = now.diff(moment(t), 'hours');
  var minutesDiff = now.diff(moment(t), 'minutes');
  var secondsDiff = now.diff(moment(t), 'seconds');

  if (daysDiff > 0) {
    return daysDiff.toString() + 'd';
  }

  if (hoursDiff > 0) {
    return hoursDiff.toString() + 'h';
  }

  if (minutesDiff  > 0) {
    return minutesDiff.toString() + 'm';
  }

  return "Just now";
}

function fromNowShortHand(t, addAgo) {
  var shortHand = fromNowShortHandHelper(t);
  if (addAgo) {
    if (shortHand == "Just now") {
      return shortHand;
    } else {
      return shortHand + " ago"
    }
  } else {
    return shortHand;
  }
}

var TimeAgo = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    time: PropTypes.string.isRequired,
    interval: PropTypes.number,
    hideAgo: PropTypes.bool
  },

  getDefaultProps() {
    return {
      hideAgo: false,
      interval: 5000
    }
  },

  componentDidMount() {
    var {interval} = this.props;
    this.setInterval(this.update, interval);
  },

  componentWillUnmount() {
    this.clearInterval(this.update);
  },

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    this.forceUpdate();
  },


  render() {
    return (
      <Text {...this.props}>
        {fromNowShortHand(this.props.time, this.props.addAgo)}
      </Text>
    );
  }
});

module.exports = TimeAgo;
