var React = require('react-native');

var ReactBridge = require('react-native').NativeModules.ReactBridge;

import LaunchCarousel from '../launchCarousel/launchCarousel';
import Home from '../home/home';

var {
  View,
  Navigator,
  Text,
} = React;

export default class MelamineLaunch extends React.Component {
  renderScene(route, nav) {
    switch(route.id) {
      case 'Home':
        return (<Home navigator={nav}/>);
      case 'LaunchCarousel':
        return(<LaunchCarousel navigator={nav}/>);
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
