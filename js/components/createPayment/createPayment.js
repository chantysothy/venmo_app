'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  TextInput,
  View,
  LayoutAnimation,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';

var GridView = require('react-native-grid-view');

var styles = require('./createPaymentStyles');
var textStyles = require('../../shared/textStyles');

class CreatePayment extends Component {
  constructor(props) {
    super(props);

    this.numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];

    this.state = {
      amount: "",
      note: "",
      page: "amount",
    }
  }

  render() {
    var amountFormatted = this.state.amount === "" ? "£0" : "£" + this.state.amount;

    return(
      <View style={styles.container}>
        <View style={styles.amountTextContainer}>
          <Text style={[textStyles.text, styles.amountText]}>{amountFormatted}</Text>
        </View>
        <GridView items={this.numberButtons} itemsPerRow={3} renderItem={(item) => this._renderNumberButton(item)} scrollEnabled={false}/>
        <View style={styles.payButtonsContainer}>
          <TouchableHighlight
            style={[styles.payButtons, styles.requestButton]}
            onPress={() => this._transitionToNextStep(true)}>
            <Text style={[textStyles.text, styles.payButtonsText]}>Request</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.payButtons}
            onPress={() => this._transitionToNextStep(false)}>
            <Text style={[textStyles.text, styles.payButtonsText]}>Pay</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _renderNumberButton(item) {
    return(
      <TouchableHighlight key={item} activeOpacity={.9} underlayColor={"#0b777f"}
        onPress={() => this._onNumberButtonPress(item)} style={styles.numberButton}>
        <Text style={[textStyles.text, styles.numberButtonText]}>{item}</Text>
      </TouchableHighlight>
    );
  }

  _onNumberButtonPress(item) {
    LayoutAnimation.spring();
    this.setState({
      amount: item === "back" ? this.state.amount.slice(0, -1) : this.state.amount + item,
    });
  }

  _transitionToNextStep(isRequest) {
    this.props.navigator.push({
      id: 'PaymentSelectUser',
      amount: this.state.amount,
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(CreatePayment)
