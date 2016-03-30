'use strict';

import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Navigator,
  InteractionManager,
  NativeAppEventEmitter,
  RefreshControl,
} from 'react-native';

import { connect } from 'react-redux/native';
import { withEmailAndToken } from '../../utils/utils';
import { fetchCharges, payPendingCharge, declinePendingCharge } from '../../actions/chargesActions.js';
import { Feed } from '../feed/feed.js';
import TitleBar from '../titleBar/titleBar';

var Icon = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var styles = require('./chargesStyles.js');
var textStyles = require('../../shared/textStyles');
var TimeAgo = require('../../utils/timeAgo.js');

var NO_CHARGES = {
  isNoCharge: true,
  payment: { id: 1 },
  payee: {},
  payer: {}
};

class Charges extends Component {
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      withEmailAndToken((email, token) => {
        this.props.dispatch(fetchCharges(email, token));
      });
    });
  }

  render() {
    var charges = this.props.charges.charges;

    if (charges.length == 0) {
      charges = [NO_CHARGES];
    }
    var chargeList = <ChargeList
        user={this.props.user}
        style={styles.socialFeed}
        isFetching={this.props.charges.isFetching || this.props.charges.payingOrDecliningCharge}
        refreshCharges={this._refreshCharges.bind(this)}
        dispatch={this.props.dispatch}
        charges={charges} />

    return(
      <View style={styles.container}>
        <TitleBar text="Charges" back={() => this.props.navigator.pop()} />
          <View style={styles.chargeListContainer}>
            {chargeList}
          </View>
      </View>
    );
  }

  _refreshCharges() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(fetchCharges(email, token));
    });
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
    return (
      <ListView
        style={styles.container}
        dataSource={ this.state.dataSource }
        renderRow={this.renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetching}
            onRefresh={this.props.refreshCharges.bind(this)}
            enabled={true}
          />}
      />
    );
  }

  renderRow(item) {
    return (
      <Charge
        key = { item.payment.id }
        dispatch={this.props.dispatch}
        isNoCharge = { item.isNoCharge }
        payment = { item.payment }
        user = { this.props.user }
        payee = { item.payee }
        payer = { item.payer } />
    )
  }
}

class Charge extends Component {
  render() {
    // if no charges to display:
    if (this.props.isNoCharge) {
      return (
        <View style={styles.noChargeView}>
          <Text style={[textStyles.text, styles.noChargesText]}>
            You've got no charges. Hooray!
          </Text>
        </View>
      )
    }
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
              addAgo = { true }
              time = {this.props.payment.updated_at} />
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              activeOpacity={0.5}
              onPress={this._declineCharge.bind(this)}
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
    this.props.dispatch(payPendingCharge(this.props.user.params, this.props.payment));
  }

  _declineCharge() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(declinePendingCharge(email, token, this.props.payment.id));
    });
  }
}
function mapStateToProps(state){
  return {
    user: state.user,
    charges: state.charges
  };
}


export default connect(mapStateToProps)(Charges)
