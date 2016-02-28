'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux/native';

import { fetchFacebookLogin, fetchLoginWithToken } from '../../actions/loginActions.js';
import { withEmailAndToken } from '../../utils/utils';

import * as colors from '../../constants/colors';
import * as textStyles from '../../shared/textStyles';

var {width, height} = Dimensions.get('window');

var FacebookLoginManager = require('../../utils/facebookLoginManager')
var ViewPager = require('react-native-viewpager');

class LaunchCarousel extends Component {
  constructor(props) {
    super(props);

    var pages = [1,2,3];

    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    this.dataSource = dataSource.cloneWithPages(pages);
  }

  componentWillMount() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(fetchLoginWithToken(email, token, this.props.navigator));
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.underPage}/>
        <ViewPager
          dataSource={this.dataSource}
          renderPage={this._renderPage.bind(this)}
          onChangePage={this._onChangePage.bind(this)}
          isLoop={false}/>
      </View>
    );
  }

  _renderPage(page) {
    switch (page) {
      case 1:
        return (
          <View style={[styles.page]}>
            <View style={styles.fullHeight}>
              <Text style={textStyles.text}>Welcome to Venmo</Text>
            </View>
        </View>);
      case 2:
        return (<View style={styles.page}>
          <Text style={textStyles.text}>This is the 2nd page</Text>
        </View>);
      case 3:
        return (<View style={styles.page}>
          <TouchableHighlight
            underlayColor='#3B0B0B'
            style={styles.loginButton}
            onPress={() => this._loginWithFacebook()} >
            <Text style={textStyles.text}> Login with Facebook </Text>
          </TouchableHighlight>
        </View>);
      default:
        return (<View/>);
    }
  }

  _onChangePage(page) {
    switch (page) {
      case 1:
      case 2:
      case 3:
      default:
        return (<View/>);
    }
  }

  _loginWithFacebook() {
    var self = this;
    FacebookLoginManager.newSession((error, data) => {
      if (error) {
        console.log('error ' + error);
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
  },
  page: {
    backgroundColor: colors.green,
    width: width,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullHeight: {
    height: height * 1.5,
    width: width,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: height / 2,
    width: width,
    backgroundColor: 'transparent',
  },
});

module.exports = connect()(LaunchCarousel);
