'use strict';

import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';

import TitleBar from '../titleBar/titleBar';
import { fetchPrivateFeed } from '../../actions/feedActions.js';
import { Feed } from '../feed/feed.js';
import { withEmailAndToken } from '../../utils/utils';

var Icon = require('react-native-vector-icons/Ionicons');

var styles = require('./userProfileStyles.js');
var textStyles = require('../../shared/textStyles');

class UserProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TitleBar text="Profile"
          back={() => this.props.navigator.pop()}
          forwardText="Done"
          forward={() => this.props.navigator.pop()}/>
        <View style={styles.profile}>
          <Feed
            style={styles.privateFeed}
            renderHeader={() => this._renderHeader()}
            feed={this.props.feed.privatePayments}
            isFetching={this.props.feed.isFetching}
            refreshFeed={this._refreshPrivateFeed.bind(this)} />
        </View>
      </View>
    );
  }

  _refreshPrivateFeed() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(fetchPrivateFeed(email, token));
    });
  }

  _renderHeader() {
    var user = this.props.user.params.user;
    var balance = this.props.user.params.balance;
    var imageUrl = user.profile_photo_url;
    var fullName = user.first_name + " " + user.last_name;
    var displayName = user.display_name;
    var phone_number = user.phone_number;
    var about = user.about;
    var email = user.email;

    return (<View style={styles.profile}>
      <Text style={styles.profileName}> { fullName } </Text>
      <Image
        style={styles.profilePhoto}
        source={{uri: imageUrl }} />
      <Text style={styles.details}> { email } {phone_number} </Text>
      <Text style={styles.details}> Balance:  { balance.balance_formatted } </Text>
    </View>);
  }
}


function mapStateToProps(state){
  return {
    user: state.user,
    feed: state.feed
  };
}


export default connect(mapStateToProps)(UserProfile)
