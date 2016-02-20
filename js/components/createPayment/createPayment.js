'use strict';

import React, {
  Component,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  View,
  LayoutAnimation,
} from 'react-native';

import { connect } from 'react-redux/native';

var GridView = require('react-native-grid-view');
var Modal = require('react-native-modalbox');

var styles = require('./createPaymentStyles');
var textStyles = require('../../shared/textStyles');

import Search from './search'

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
        <GridView items={this.numberButtons} itemsPerRow={3} renderItem={(item) => this._renderNumberButton(item)}/>
        <View style={styles.payButtonsContainer}>
          <TouchableHighlight
            style={[styles.payButtons, styles.requestButton]}
            onPress={() => this.setState({
              postAmountModalVisible: true,
              request: true
            })}>
            <Text style={[textStyles.text, styles.payButtonsText]}>Request</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.payButtons}
            onPress={() => this.setState({
              postAmountModalVisible: true,
              request: false
            })}>
            <Text style={[textStyles.text, styles.payButtonsText]}>Pay</Text>
          </TouchableHighlight>
        </View>
        <Modal isOpen={this.state.postAmountModalVisible}
          style={styles.modal} position="bottom"
          onOpened={() => this.setState({postAmountModalVisible: true})}
          onClosed={() => this.setState({postAmountModalVisible: false})}>
          <Search amount={this.state.amount}/>
        </Modal>
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
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(CreatePayment)
