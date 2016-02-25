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
var Animatable = require('react-native-animatable');
var Icon = require('react-native-vector-icons/Ionicons');

import TitleBar from '../titleBar/titleBar';

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
        <TitleBar text="" back={() => this.props.navigator.pop()}/>
        <Animatable.View ref="amountTextContainer" style={styles.amountTextContainer}
          easing="ease-in-out">
          <Text style={[textStyles.text, styles.amountText]}>{amountFormatted}</Text>
        </Animatable.View>
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
    if(item === "back") {
      var text = <Icon name="backspace-outline" size={30} color="white"/>;
    } else {
      var text = <Text style={[textStyles.text, styles.numberButtonText]}>{item}</Text>;
    }
    return(
      <TouchableHighlight key={item} activeOpacity={.9} underlayColor={"#0b777f"}
        onPress={() => this._onNumberButtonPress(item)} style={styles.numberButton}>
        {text}
      </TouchableHighlight>
    );
  }

  _onNumberButtonPress(item) {
    LayoutAnimation.spring();

    // some validations
    if ((this.state.amount === "" && item === "0") ||
      (this.state.amount.indexOf(".") != -1 && item === ".") ||
      (this.state.amount === "" && item === "back") ||
      ((this.state.amount.indexOf(".") != -1 && item !== "back" && this.state.amount.indexOf(".") + 2 < this.state.amount.length))) {
      this.refs.amountTextContainer.wobble(500)
    } else {
      this.setState({
        amount: item === "back" ? this.state.amount.slice(0, -1) : this.state.amount + item,
      });
    }
  }

  _transitionToNextStep(isRequest) {
    var amount = isRequest ? "-" + this.state.amount : this.state.amount;

    this.props.navigator.push({
      id: 'PaymentSelectUser',
      amount: amount,
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
