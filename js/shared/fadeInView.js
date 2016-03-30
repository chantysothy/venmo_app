var React = require('react-native');

var {
  View,
  Animated,
} = React;

class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1},
     ).start();
  }
  render() {
    return (
      <Animated.View
        style={{opacity: this.state.fadeAnim}}>
        {this.props.children}
      </Animated.View>
    );
  }
}

module.exports = FadeInView;
