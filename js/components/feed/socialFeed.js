'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux/native';
import { fetchSocialFeed } from '../../actions/socialFeedActions.js';
import { withEmailAndToken } from '../../utils/utils';

// var styles = require('./homeStyles');
//

function isCharge(payment) {
  return payment.status == "pending";
}

class SocialFeed extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    };
  }

  componentDidMount() {
    withEmailAndToken((email, token) => {
        this.props.dispatch(fetchSocialFeed(email, token));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.feed.friendPayments != this.props.feed.friendPayments) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.feed.friendPayments)
      });
    }
  }

  render() {
    var socialFeed = this.props.feed.friendPayments.map((item) => {
      return (
        <FeedItem
          key = { item.payment.id }
          payment = { item.payment }
          payee = { item.payee }
          payer = { item.payer } />
      )
    });

    if (this.props.feed.isFetching) {
      return(<View><Text>Fetching...</Text></View>);
    } else {
      return (
        <ListView
          dataSource={ this.state.dataSource }
          renderRow={this.renderRow} />
      );
    }
  }

  renderRow(item) {
    return (
      <FeedItem
        key = { item.payment.id }
        payment = { item.payment }
        payee = { item.payee }
        payer = { item.payer } />
    )
  }
}

class FeedItem extends Component {
  render() {
    var payee = this.props.payee.user.first_name + " " + this.props.payee.user.last_name;
    var payer = this.props.payer.user.first_name + " " + this.props.payer.user.last_name;
    if (isCharge(this.props.payment)) {
      var summary = payee + " charged " + payer + " " + this.props.payment.amount.amount_formatted;
    } else {
      var summary = payer + " payed " + payee + " " + this.props.payment.amount.amount_formatted;
    }
    return (
      <View
        style = {{ margin: 10 }}>
        <View>
          <Image
            style={{height: 50, width: 50 }}
            source={{uri: this.props.payer.user.profile_photo_url }} />
          <Image
            style={{height: 50, width: 50 }}
            source={{uri: this.props.payee.user.profile_photo_url }} />
        </View>
        <View>
          <Text>
            { summary }
          </Text>
          <Text>
            { this.props.payment.note }
          </Text>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.feed);
  return {
    feed: state.feed
  }
}

export default connect(mapStateToProps)(SocialFeed)
