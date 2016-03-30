'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Animated,
  Easing,
  Platform,
} from 'react-native';

import { connect } from 'react-redux/native';

import { fetchFacebookLogin, fetchLoginWithToken } from '../../actions/loginActions.js';
import { withEmailAndToken } from '../../utils/utils';
import Popup from 'react-native-popup';

import * as colors from '../../constants/colors';
import * as textStyles from '../../shared/textStyles';
import FadeInView from '../../shared/fadeInView';

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var FacebookLoginManager = require('../../utils/facebookLoginManager')

var ViewPager = require('react-native-viewpager');
var LoadingOverlay = require('../../shared/loadingOverlay');

class LaunchCarousel extends Component {
  constructor(props) {
    super(props);

    var pages = [1, 2, 3, 4];
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.dataSource = dataSource.cloneWithPages(pages);

    this.mockStartCoordinates = {
      x: width / 10,
      y: height,
    };

    this.state = {
      pan: new Animated.ValueXY(this.mockStartCoordinates),
      underPageVisible: false,
      hasLoggedOut: false,
    };
  }

  componentWillMount() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(fetchLoginWithToken(email, token, this.props.navigator));
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        underPageVisible: true,
      });
    }, 400);
  }

  render() {
    if (this.state.underPageVisible) {
      var image = <Animated.Image
        resizeMode="contain"
        style={[styles.mock, { transform: this.state.pan.getTranslateTransform(), }]}
        source={require('./iphone.png')} />
      var underPageGreenContainer = <View style={styles.underPageGreenContainer}/>
      var underPage = (
        <View style={[styles.underPage, styles.notVisible]}>
          {image}
          {underPageGreenContainer}
        </View>
      );
    }

    var loadingIndicatorVisible = this.props.user.isFetching;
    var loadingOverlay = (<LoadingOverlay isVisible={loadingIndicatorVisible} />);
    if (Platform.OS === 'android') {
      if (loadingIndicatorVisible) {
        var androidLoadingOverlay = loadingOverlay;
      } else {
        var androidLoadingOverlay = null;
      }
      var iosLoadingOverlay = null;
    } else if (Platform.OS === 'ios') {
      var iosLoadingOverlay = loadingOverlay;
      var androidLoadingOverlay = null;
    }

    return(
      <FadeInView style={styles.container}>
        { iosLoadingOverlay }
        { underPage }
        <ViewPager
          dataSource={this.dataSource}
          renderPage={this._renderPage.bind(this)}
          willChangePage={this._onChangePage.bind(this)}
          isLoop={false}/>
        <Popup ref={(popup) => { this.popup = popup }}/>
        { androidLoadingOverlay }
      </FadeInView>
    );
  }

  _renderPage(page) {
    switch (page) {
      case 1:
        return (
          <View style={styles.firstPage}>
            <View style={styles.fullHeight}>
              <Text style={[textStyles.text, textStyles.headerText]}>Cashew</Text>
              <Text style={[textStyles.text, textStyles.subheaderText, textStyles.centered]}>
                Here's what you'll need to know to get started.
              </Text>
            </View>
        </View>);
      case 2:
        return (
          <View style={styles.page}>
            <Text style={[textStyles.text, textStyles.subheaderText, textStyles.centered]}>Send or request money, with just a tap.</Text>
          </View>);
      case 3:
        return (
          <View style={styles.page}>
            <Text style={[textStyles.text, textStyles.subheaderText, textStyles.centered]}>See what your friends are paying for.</Text>
          </View>);
      case 4:
        return (
          <View style={styles.page}>
            <TouchableHighlight
              underlayColor={colors.darkGreen}
              style={styles.loginButton}
              onPress={() => this._loginWithFacebook()} >
              <Text style={textStyles.text}> Login with Facebook </Text>
            </TouchableHighlight>
          </View>);
      default:
        return (<View/>);
    }
  }

  _onChangePage(pageIndex) {
    var sendMoneyCoordinates = {
      x: width / 10,
      y: height < 500 ? height / 2.8 : height / 2.5,
    };

    var socialFeedCoordinates = {
      x: width / 10,
      y: 0,
    }

    switch(pageIndex) {
      case 0:
        Animated.sequence([
          Animated.timing(this.state.pan, {
            toValue: this.mockStartCoordinates,
            easing: Easing.inOut(Easing.cubic),
          }),
        ]).start();
        return;
      case 1:
        Animated.sequence([
          Animated.timing(this.state.pan, {
            toValue: sendMoneyCoordinates,
            easing: Easing.inOut(Easing.cubic),
            duration: 600,
          }),
        ]).start();
        return;
      case 2:
        Animated.sequence([
          Animated.timing(this.state.pan, {
            toValue: socialFeedCoordinates,
            easing: Easing.inOut(Easing.cubic),
          }),
        ]).start();
      default:
        return (<View/>);
    }
  }

  _loginWithFacebook() {
    var self = this;
    FacebookLoginManager.newSession((error, data) => {
      if (error) {
        if (!this.state.hasLoggedOut) {
          this.setState({ hasLoggedOut: true });
          if (Platform.OS == 'android') {
            return FacebookLoginManager.logout(() => {
              this._loginWithFacebook();
            });
          } else {
            // may be race conditions here
            FacebookLoginManager.logout();
            this._loginWithFacebook();
            return;
          }
        }
        if (error !== "Canceled") {
          this.popup.tip({
            title: 'Login Error',
            content: ["There was a problem authenticating you. Please contact us."],
            btn: { text: 'Okay' },
          });
        }
      } else {
        self.props.dispatch(fetchFacebookLogin(data.token, self.props.navigator));
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: colors.green,
  },
  firstPage: {
    backgroundColor: colors.green,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  page: {
    backgroundColor: colors.green,
    width: width,
    marginTop: height * 2/3 ,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  fullHeight: {
    height: height,
    width: width,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  loginButton: {
    width: width - 80,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  underPage: {
    position: 'absolute',
    height: height / 3 * 2,
    width: width,
    backgroundColor: colors.darkGreen,
  },
  underPageGreenContainer: {
    position: 'absolute',
    top: height / 3 * 2,
    height: height / 3,
    width: width,
    backgroundColor: colors.green,
  },
  mock: {
    height: .8 * width * 2.32,
    width: width * .8,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
module.exports = connect(mapStateToProps)(LaunchCarousel);
