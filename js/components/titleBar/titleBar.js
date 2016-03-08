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
        style={[textStyles.text, styles.text, styles.sideText]}>
        {this.props.backView ? this.props.backView : "Back"}
      </Button>
    ) : null;

    var forwardButton = this.props.forward ? (
      <Button containerStyle={styles.forwardButton} onPress={this.props.forward}
        disabled={this.props.forwardDisabled}
        styleDisabled={styles.forwardTextDisabled}
        style={[textStyles.text, styles.text, styles.sideText]}>
        {this.props.forwardText}
        {this.props.forwardView}
        </Button>
    ) : null;

    var barStyles = [styles.bar];
    if (Platform.OS == 'ios') {
      barStyles.push(styles.iosBar);
    }

    return (
      <View style={barStyles}>
        {backButton}
        <Text style={[textStyles.text, styles.text, styles.titleText]}>{this.props.text}</Text>
        {forwardButton}
      </View>
    );
  }
}
