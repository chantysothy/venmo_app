'use strict';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Navigator,
  Platform,
  InteractionManager,
} from 'react-native';

import { connect } from 'react-redux/native';
import { Feed } from '../feed/feed.js';
import { Menu } from '../sideMenu/sideMenu.js';
import colors from '../../constants/colors.js';

import { fetchSocialFeed, fetchPrivateFeed, fetchPublicFeed } from '../../actions/feedActions.js';
import { withEmailAndToken } from '../../utils/utils';

var Icon = require('react-native-vector-icons/Ionicons');
var styles = require('./homeStyles');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var textStyles = require('../../shared/textStyles');
var SideMenu = require('react-native-side-menu');

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
      withEmailAndToken((email, token) => {
          this.props.dispatch(fetchPublicFeed(email, token));
          this.props.dispatch(fetchSocialFeed(email, token));
          this.props.dispatch(fetchPrivateFeed(email, token));
      });
    });
  }

  render() {
    var homeStyles = [styles.container];

    if (Platform.OS == 'ios') {
      homeStyles.push(styles.iosContainer);
    }


    if (this.props.user.isFetching) {
      return(<View><Text>Fetching...</Text></View>);
    } else {
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
              renderTabBar={this._renderSideMenu.bind(this)}>
              <Feed
                tabLabel="earth"
                style={styles.socialFeed}
                feed={this.props.feed.publicPayments}
                isFetching={this.props.feed.isFetching}
                refreshFeed={this._refreshSocialFeed.bind(this)} />
              <Feed
                tabLabel="stalker-person"
                style={styles.socialFeed}
                feed={this.props.feed.friendPayments}
                isFetching={this.props.feed.isFetching}
                refreshFeed={this._refreshSocialFeed.bind(this)} />
              <Feed
                tabLabel="person"
                style={styles.socialFeed}
                feed={this.props.feed.privatePayments}
                isFetching={this.props.feed.isFetching}
                refreshFeed={this._refreshPrivateFeed.bind(this)} />
            </ScrollableTabView>
          </View>
        </SideMenu>
      );
    }
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

  _renderSideMenu() {
    return (
      <HomeNavBar
        toggleSideMenu={this._toggleSideMenu.bind(this)}
        navigator={this.props.navigator}/>
    )
  }
}

class HomeNavBar extends Component {
  renderButton(iconName, pageId) {
    var buttonStyles = [styles.feedButton];
    var iconColor = "white";
    if (this.props.activeTab === pageId) {
      buttonStyles.push({ backgroundColor: "white" });
      iconColor = colors.green;
    }

    // If center button
    if (pageId == 0) {
      buttonStyles.push(styles.leftButton);
    }
    if (pageId == 1) {
      buttonStyles.push(styles.centerButton);
    }
    if (pageId == 2) {
      buttonStyles.push(styles.rightButton);
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
          style={[styles.feedButton, styles.moreMenuButton]} >
          <Icon name="navicon" size ={30} color="white"/>
        </TouchableHighlight>
        <View style={styles.feedButtons}>
          { this.renderButton("earth", 0) }
          { this.renderButton("person-stalker", 1) }
          { this.renderButton("person", 2) }
        </View>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={colors.green}
          style={[styles.feedButton, styles.createPaymentButton]}
          onPress={this._transitionToCreatePayment.bind(this)}>
          <Icon name="compose" size ={30} color="white"/>
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
