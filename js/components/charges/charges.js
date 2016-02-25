'use strict';

import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';
import { withEmailAndToken } from '../../utils/utils';
import { fetchCharges, payPendingCharge } from '../../actions/chargesActions.js';
import { Feed } from '../feed/feed.js';

var Icon = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var styles = require('./chargesStyles.js');
var textStyles = require('../../shared/textStyles');
var TimeAgo = require('../../utils/timeAgo.js');

class Charges extends Component {
  componentWillMount() {
    withEmailAndToken((email, token) => {
        this.props.dispatch(fetchCharges(email, token));
    });
  }

  render() {
    var charges = this.props.charges.charges;

    return (
      <View style={styles.container}>
        <View
          style={styles.rightContainer}>
          <ChargeList
            style={styles.socialFeed}
            isFetching={false}
            dispatch={this.props.dispatch}
            charges={charges} />
        </View>
      </View>
    );
  }
}

class ChargeList extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                              .cloneWithRows(this.props.charges)
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.charges !== this.props.charges) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.charges)
      });
    }
  }

  render() {
    if (this.props.isFetching) {
      return(<View><Text>Fetching...</Text></View>);
    } else {
      return (
        <ListView
          style={styles.container}
          dataSource={ this.state.dataSource }
          renderRow={this.renderRow.bind(this)} />
      );
    }
  }

  renderRow(item) {
    return (
      <Charge
        key = { item.payment.id }
        dispatch={this.props.dispatch}
        payment = { item.payment }
        payee = { item.payee }
        payer = { item.payer } />
    )
  }
}

class Charge extends Component {
  render() {
    var payee = this.props.payee.user.first_name + " " + this.props.payee.user.last_name;
    var payer = this.props.payer.user.first_name + " " + this.props.payer.user.last_name;
    var imageUrl = this.props.payee.user.profile_photo_url;

    return (
      <View style={styles.feedItem}>
        <Image
          style={styles.feedItemThumbnail}
          source={{uri: imageUrl }} />
        <View style = {[styles.feedItemRightContainer]}>
          <Text style={[textStyles.text, styles.feedItemSummary]}>
            <Text style={textStyles.bold}>{ payee }</Text> requests
            <Text style={textStyles.bold}> { this.props.payment.amount.amount_formatted } </Text>
          </Text>
          <Text style={styles.feedItemNote}>
            <Text style={[textStyles.text, styles.feedItemNote]}>
              { this.props.payment.note }
            </Text>
          </Text>
          <Text style={[textStyles.text, styles.timeAgo]} >
            <TimeAgo
              time = {this.props.payment.updated_at} /> ago
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="rgba(0,0,0,0.5)"
              style={[styles.button, styles.declineButton]}>
              <Text style={[textStyles.text, textStyles.black]}>
                Decline
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="green"
              onPress={this._payCharge.bind(this)}
              style={[styles.button, styles.payButton]}>
              <Text style={textStyles.text}>
                Pay
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  _payCharge() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(payPendingCharge(email, token, this.props.payment.id));
    });
  }
}
function mapStateToProps(state){
  return {
    charges: state.charges
  };
}


export default connect(mapStateToProps)(Charges)
