var React = require('react-native');
import getDimensions from './dimensions';
import Spinner from 'react-native-loading-spinner-overlay';
var {width, height} = getDimensions();

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
      <View style={styles.background}>
        <Spinner visible={this.props.isVisible} />
      </View>
    );
  }
});

var {width, height} = getDimensions();
var styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  hidden:{
    position: 'absolute',
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  }
})

module.exports = LoadingOverlay;
