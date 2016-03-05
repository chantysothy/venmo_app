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
    var name = this.props.user.params.user.first_name;

    return (
      <View style={styles.container}>
        <TitleBar text={name}
          back={() => this.props.navigator.pop()} />
        <Feed
          style={styles.privateFeed}
          renderHeader={() => this._renderHeader()}
          feed={this.props.feed.privatePayments}
          isFetching={this.props.feed.isFetching}
          refreshFeed={this._refreshPrivateFeed.bind(this)} />
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
    var displayName = user.display_name;
    var phone_number = user.phone_number;
    var about = user.about;
    var email = user.email;

    return (<View style={styles.profile}>
      <Image style={styles.profilePhoto} source={{uri: imageUrl }} />
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
