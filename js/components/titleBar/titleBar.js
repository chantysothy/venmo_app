'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var styles = require('./titleBarStyles');
var textStyles = require('../../shared/textStyles');

var {
  Text,
  View,
  TouchableHighlight,
  Component,
  Platform
} = React;

export default class TitleBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var backButton = this.props.back ? (
      <Button containerStyle={styles.backButton} onPress={this.props.back}
        style={[textStyles.text, styles.text]}>
        Back
      </Button>
    ) : null;

    var forwardButton = this.props.forward ? (
      <Button containerStyle={styles.forwardButton} onPress={this.props.forward}
        disabled={this.props.forwardDisabled}
        styleDisabled={styles.forwardTextDisabled}
        style={[textStyles.text, styles.text]}>
        {this.props.forwardText}
        </Button>
    ) : null;

    var barStyle = [styles.bar];
    if (Platform.OS == 'ios') {
      barStyle.push(styles.iosBar);
    }

    return (
      <View style={styles.bar}>
        {backButton}
        <Text style={[textStyles.text, styles.text, styles.titleText]}>{this.props.text}</Text>
        {forwardButton}
      </View>
    );
  }
}
