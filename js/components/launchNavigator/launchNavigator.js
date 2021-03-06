var React = require('react-native');

var ReactBridge = require('react-native').NativeModules.ReactBridge;

import LaunchCarousel from '../launchCarousel/launchCarousel';
import Home from '../home/home';
import CreatePayment from '../createPayment/createPayment';
import PaymentSelectUser from  '../createPayment/paymentSelectUser';
import UserProfile from  '../userProfile/userProfile.js';
import Charges from  '../charges/charges.js';
import PhoneVerification from '../phoneVerification/phoneVerification.js';
import PrivacyPolicy from '../privacyPolicy/privacyPolicy.js';
import Settings from '../settings/settings.js';
import Withdraw from '../withdraw/withdraw.js';
import EditBank from '../withdraw/editBank.js';
import codePush from "react-native-code-push";

import Popup from 'react-native-popup';

import { updateUser } from '../../actions/loginActions.js';

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var {
  View,
  Navigator,
  Text,
  Platform,
  StatusBarIOS,
  NativeAppEventEmitter,
} = React;

export default class MelamineLaunch extends React.Component {
  constructor(props){
    super(props);

    // Handle the hardware back press if on Android
    if (Platform.OS == 'android') {
      React.BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this._navigator !== null) {
          var currentRoutes = this._navigator.getCurrentRoutes();
          var currentRoute = currentRoutes[currentRoutes.length - 1];
          console.log(currentRoute);
          if (currentRoute.id != 'Home') {
            this._navigator.pop();
            return true;
          }
        }
        return false;
      });
    } else {
      StatusBarIOS.setStyle('light-content');
    }
  }

  componentWillMount() {
    if (Platform.OS == 'ios') {
      codePush.sync();
    }
    this.popupListener = NativeAppEventEmitter.addListener('showPopup', (options) => {
      this.global_popup.tip({
        title: options.title,
        content: options.content,
        btn: { text: options.buttonText },
      });
    });
  }

  componentWillUnmount() {
    this.popupListener.remove();
  }

  renderScene(route, nav)  {
    return (
      <View style={{height: height, width: width}}>
        { this.renderSceneHelper(route, nav) }
        <Popup ref={(popup) => this.global_popup = popup}/>
      </View>
    );
  }
  renderSceneHelper(route, nav) {
    this._navigator = nav;
    switch(route.id) {
      case 'Home':
        return (<Home navigator={nav}/>);
      case 'CreatePayment':
        return (<CreatePayment navigator={nav}/>);
      case 'PaymentSelectUser':
        return(<PaymentSelectUser amount={route.amount} navigator={nav}/>);
      case 'LaunchCarousel':
        return(<LaunchCarousel navigator={nav}/>);
      case 'UserProfile':
        return(<UserProfile navigator={nav}/>);
      case 'Charges':
        return(<Charges navigator={nav}/>);
      case 'PhoneVerification':
        return(<PhoneVerification navigator={nav}/>);
      case 'Withdraw':
        return(<Withdraw navigator={nav}/>);
      case 'EditBank':
        return(<EditBank navigator={nav}/>);
      case 'Settings':
        return(<Settings navigator={nav}/>);
      case 'PrivacyPolicy':
        return(<PrivacyPolicy navigator={nav}/>);
    }
  }

  render() {
    return(
      <React.Navigator
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{id: 'LaunchCarousel'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}
