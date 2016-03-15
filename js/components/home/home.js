'use strict';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Navigator,
  Platform,
  InteractionManager,
  Image,
} from 'react-native';

import { connect } from 'react-redux/native';
import { Feed } from '../feed/feed.js';
import { Menu } from '../sideMenu/sideMenu.js';
import colors from '../../constants/colors.js';

import { fetchSocialFeed, fetchPrivateFeed, fetchPublicFeed } from '../../actions/feedActions.js';
import { refreshState } from '../../actions/genericActions.js';
import { withEmailAndToken } from '../../utils/utils';

var Icon = require('react-native-vector-icons/Ionicons');
var styles = require('./homeStyles');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var textStyles = require('../../shared/textStyles');
var SideMenu = require('react-native-side-menu');
var PushNotificationManager = require('../../utils/pushNotificationManager');

function isPlaceholderFeed(feed) {
  return (feed.length > 0) && feed[0].isPlaceholder;
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      sideMenuOpen: false,
      alreadyRendered: false,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._refreshState();
    });

    //PushNotificationManager.registerForPushNotifications();
  }

  render() {
    var homeStyles = [styles.container];

    if (Platform.OS == 'ios') {
      homeStyles.push(styles.iosContainer);
    }

    var user = this.props.user.params.user;
    var balance = this.props.user.params.balance;
    var menu = <Menu user={user} balance={balance} navigator={this.props.navigator}/>

    return (
      <SideMenu
        menu={menu}
        openMenuOffset={200}
        disableGestures={true}
        onChange={this._onSideMenuToggle.bind(this)}
        isOpen={this.state.sideMenuOpen}>
        <View style={homeStyles}>
          <ScrollableTabView
            initialPage={1}
            renderTabBar={this._renderTabBar.bind(this)}>
            <Feed
              tabLabel="earth"
              style={styles.socialFeed}
              feed={this.props.feed.publicPayments}
              isFetching={this.props.feed.isFetching}
              refreshFeed={this._refreshState.bind(this)} />
            <Feed
              tabLabel="stalker-person"
              style={styles.socialFeed}
              feed={this.props.feed.friendPayments}
              isFetching={this.props.feed.isFetching}
              refreshFeed={this._refreshState.bind(this)} />
            <Feed
              tabLabel="person"
              style={styles.socialFeed}
              feed={this.props.feed.privatePayments}
              isFetching={this.props.feed.isFetching}
              refreshFeed={this._refreshState.bind(this)} />
          </ScrollableTabView>
        </View>
      </SideMenu>
    );
  }

  _refreshState() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(refreshState(email, token));
    });
  }

  _refreshPublicFeed() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(fetchPublicFeed(email, token));
    });
  }
  _refreshSocialFeed() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(fetchSocialFeed(email, token));
    });
  }

  _refreshPrivateFeed() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(fetchPrivateFeed(email, token));
    });
  }

  _toggleSideMenu() {
    this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
  }

  _onSideMenuToggle(isOpen) {
    this.setState({sideMenuOpen: isOpen });
  }

  _renderTabBar() {
    return (
      <HomeNavBar
        friendPayments={this.props.feed.friendPayments}
        toggleSideMenu={this._toggleSideMenu.bind(this)}
        navigator={this.props.navigator}/>
    )
  }
}

class HomeNavBar extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.friendPayments !== this.props.friendPayments) {
      if (isPlaceholderFeed(this.props.friendPayments)) {
        if (nextProps.friendPayments.length == 0) {
           this.props.goToPage(0);
        }
      }
    }
  }

  renderButton(iconName, pageId) {
    var buttonStyles = [styles.feedButton];
    var iconColor = "white";
    if (this.props.activeTab === pageId) {
      buttonStyles.push({ backgroundColor: "white" });
      iconColor = colors.green;
    }

    // If center button
    if (pageId == 1) {
      buttonStyles.push(styles.centerButton);
    }
    return (
      <TouchableHighlight
        underlayColor="green"
        style={buttonStyles}
        onPress={() => this.props.goToPage(pageId)}>
        <Icon name={iconName} size ={30} color={iconColor}/>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.navbar}>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={colors.green}
          onPress={this.props.toggleSideMenu}
          style={styles.moreMenuButton} >
          <Icon name="navicon" size ={45} color="white"/>
        </TouchableHighlight>
        <View style={styles.feedButtons}>
          { this.renderButton("earth", 0) }
          { this.renderButton("person-stalker", 1) }
          { this.renderButton("person", 2) }
        </View>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={colors.green}
          style={styles.createPaymentButton}
          onPress={this._transitionToCreatePayment.bind(this)}>
          <Image
            style={[styles.composeIcon]}
            source={require('./composeIcon.png')} />
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
