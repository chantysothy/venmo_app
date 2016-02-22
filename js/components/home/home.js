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
import { Menu } from '../sideMenu/sideMenu.js';

import { fetchSocialFeed, fetchPrivateFeed } from '../../actions/feedActions.js';
import { withEmailAndToken } from '../../utils/utils';

var Icon = require('react-native-vector-icons/Ionicons');
var styles = require('./homeStyles');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var textStyles = require('../../shared/textStyles');
var SideMenu = require('react-native-side-menu');

class Home extends Component {
  constructor(props){
    super(props)
    this.state = { sideMenuOpen: false, }
  }

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
      var menu = <Menu user={user} balance={balance}/>

      return (
        <SideMenu
          menu={menu}
          openMenuOffset={200}
          onChange={this._onSideMenuToggle.bind(this)}
          isOpen={this.state.sideMenuOpen}>
          <View style={styles.container}>
            <ScrollableTabView
              initialPage={1}
              renderTabBar={this._renderSideMenu.bind(this)}>
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
        </SideMenu>
      );
    }
  }

  _toggleSideMenu() {
    console.log(this.state);
    this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
  }

  _onSideMenuToggle(isOpen) {
    console.log("TOGGLED BRO", isOpen);
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
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#900"
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
          underlayColor="#900"
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
