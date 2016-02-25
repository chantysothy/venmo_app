'use strict';

var React = require('react-native');

var styles = require('./titleBarStyles');
var textStyles = require('../../shared/textStyles');

var {
  Text,
  View,
  TouchableHighlight,
  Component,
} = React;

export default class TitleBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var backButton = this.props.back ? (
      <TouchableHighlight style={styles.backButton} onPress={this.props.back}>
        <Text style={[textStyles.text, styles.text]}>Back</Text>
      </TouchableHighlight>
    ) : null;

    var forwardButton = this.props.forward ? (
        <TouchableHighlight style={styles.forwardButton} onPress={this.props.forward}>
          <Text style={[textStyles.text, styles.text, this.props.forwardDisabled ? styles.forwardTextDisabled : null]}>{this.props.forwardText}</Text>
        </TouchableHighlight>
    ) : null;

    return (
      <View style={styles.bar}>
        {backButton}
        <Text style={[textStyles.text, styles.text, styles.titleText]}>{this.props.text}</Text>
        {forwardButton}
      </View>
    );
  }
}
