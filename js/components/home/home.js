'use strict';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';
import { Feed } from '../feed/feed.js';

import { fetchSocialFeed, fetchPrivateFeed } from '../../actions/feedActions.js';
import { withEmailAndToken } from '../../utils/utils';

var Icon = require('react-native-vector-icons/Ionicons');
var styles = require('./homeStyles');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var textStyles = require('../../shared/textStyles');

class Home extends Component {

  componentDidMount() {
    withEmailAndToken((email, token) => {
        this.props.dispatch(fetchSocialFeed(email, token));
        this.props.dispatch(fetchPrivateFeed(email, token));
    });
  }

  render() {
    if (this.props.user.isFetching) {
      return(<View><Text>Fetching...</Text></View>);
    } else {
      var user = this.props.user.params.user;
      var balance = this.props.user.params.balance;

      return (
        <View style={styles.container}>
          <ScrollableTabView initialPage={1} renderTabBar={() => <HomeNavBar navigator={this.props.navigator}/>}>
            <Feed
              tabLabel="earth"
              style={styles.socialFeed}
              feed={this.props.feed.friendPayments} />
            <Feed
              tabLabel="stalker-person"
              style={styles.socialFeed}
              feed={this.props.feed.friendPayments} />
            <Feed
              tabLabel="person"
              style={styles.socialFeed}
              feed={this.props.feed.privatePayments} />
          </ScrollableTabView>
        </View>
      );
    }
  }
}

class HomeNavBar extends Component {
  renderButton(iconName, pageId) {
    var buttonStyles = [styles.feedButton];
    var iconColor = "white";
    if (this.props.activeTab === pageId) {
      buttonStyles.push({ backgroundColor: "white" });
      iconColor = "#900";
    }

    // If center button
    if (pageId == 1) {
      buttonStyles.push(styles.centerButton);
    }
    return (
      <TouchableHighlight
        underlayColor="red"
        style={buttonStyles}
        onPress={() => this.props.goToPage(pageId)}>
        <Icon name={iconName} size ={30} color={iconColor}/>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.navbar}>
        <View style={styles.feedButtons}>
          { this.renderButton("earth", 0) }
          { this.renderButton("person-stalker", 1) }
          { this.renderButton("person", 2) }
        </View>
        <TouchableHighlight
          onPress={() => this._transitionToCreatePayment()}>
          <Text style={[textStyles.text, {color: 'black'}]}>Pay</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _transitionToCreatePayment() {
    this.props.navigator.push({
      id: 'CreatePayment',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    feed: state.feed,
  };
}

export default connect(mapStateToProps)(Home)
