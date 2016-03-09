var React = require('react-native');
var Overlay = require('react-native-overlay');
var VibrancyView = require('react-native-blur').VibrancyView;
import getDimensions from './dimensions';

var {
  View,
  ActivityIndicatorIOS,
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
      <Overlay isVisible={this.props.isVisible}>
        <VibrancyView style={styles.background} blurType="dark">
          <ActivityIndicatorIOS size="large" animating={true} />
        </VibrancyView>
      </Overlay>
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
