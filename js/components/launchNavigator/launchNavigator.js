var React = require('react-native');

var ReactBridge = require('react-native').NativeModules.ReactBridge;

import LaunchCarousel from '../launchCarousel/launchCarousel';
import Home from '../home/home';
import CreatePayment from '../createPayment/createPayment';
import PaymentSelectUser from  '../createPayment/paymentSelectUser';
import UserProfile from  '../userProfile/userProfile.js';

var {
  View,
  Navigator,
  Text,
  Platform,
} = React;

export default class MelamineLaunch extends React.Component {
  constructor(props){
    super(props);

    // Handle the hardware back press if on Android
    if (Platform.OS == 'android') {
      React.BackAndroid.addEventListener('hardwareBackPress', () => {
        // Require the route list to have more than 2 routes.
        // This is because in addition the home route, there will also be the
        // launchCarousel, and we do not want to log the user out by pressing back.
        if (this._navigator !== null && this._navigator.getCurrentRoutes().length > 2) {
          this._navigator.pop();
          return true;
        }
        return false;
      });
    }
  }

  renderScene(route, nav) {
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
