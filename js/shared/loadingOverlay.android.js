var React = require('react-native');
import getDimensions from './dimensions';

var {
  View,
  StyleSheet,
} = React;

var LoadingOverlay = React.createClass({
  getDefaultProps(): StateObject {
    return {
      isVisible: false
    }
  },

  render(): ReactElement {
    return (
      <View isVisible={this.props.isVisible}>
      </View>
    );
  }
});

var {width, height} = getDimensions();
var styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    top: height / 2 - 50,
    left: width / 2 - 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
})

module.exports = LoadingOverlay;
