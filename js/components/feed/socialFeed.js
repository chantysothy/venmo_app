'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux/native';
import { fetchSocialFeed } from '../../actions/socialFeedActions.js';
import { withEmailAndToken } from '../../utils/utils';

// var styles = require('./homeStyles');

class SocialFeed extends Component {
  componentDidMount() {
    withEmailAndToken((email, token) => {
        this.props.dispatch(fetchSocialFeed(email, token));
    });
  }

  render() {
    var socialFeed = this.props.feed.friendPayments.map((item) => {
      return ( <FeedItem key={ item.id } payment={ item } /> )
    });

    if (this.props.feed.isFetching) {
      return(<View><Text>Fetching...</Text></View>);
    } else {
      return (
        <View>
          { socialFeed }
        </View>
      );
    }
  }
}

class FeedItem extends Component {
  render() {
    return (
      <View>
        <View>
          <Image
            style={{height: 50, width: 50 }}
            source={{uri: this.props.payment.payer.profile_picture }} />
          <Image
            style={{height: 50, width: 50 }}
            source={{uri: this.props.payment.payee.profile_picture }} />
        </View>
        <View>
          <Text>
            { this.props.payment.payer.name } paid { this.props.payment.payee.name } { this.props.payment.amount_formatted }
          </Text>
          <Text>
            { this.props.payment.note }
          </Text>
        </View>
      </View>
    )
  }
}

var TEST_PAYMENT = {
  id: 1,
  payer: {
    name: "John Cena",
    profile_picture: "https://tse1.mm.bing.net/th?id=OIP.M3e2feaa1d91bde9ae52f8b2b0ca2ec5dH0&pid=15.1"
  },
  payee: {
    name: "Donald Trump",
    profile_picture: "https://tse3.mm.bing.net/th?id=OIP.M4e1cb51a66363d47c093c1ec7027fa77o2&pid=15.1"
  },
  note: "For making America Great.",
  amount_cents: 30000,
  amount_formatted: "30000$"
}

function mapStateToProps(state) {
  console.log(state.feed);
  return {
    feed: {
      isFetching: false,
      friendPayments: [TEST_PAYMENT]
    }
  }
}

export default connect(mapStateToProps)(SocialFeed)
