'use strict';

import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';
import { withEmailAndToken } from '../../utils/utils';
import { fetchCharges } from '../../actions/chargesActions.js';

var Icon = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var styles = require('./chargesStyles.js');
var textStyles = require('../../shared/textStyles');

class Charges extends Component {
  componentDidMount() {
    withEmailAndToken((email, token) => {
        this.props.dispatch(fetchCharges(email, token));
    });
  }

  render() {
    var charges = this.props.charges.charges;
    
    return (
      <View style={styles.container}>
        <View
          style={styles.rightContainer}>
          <Text style={styles.profileName}> Number of charges: { charges.length } </Text>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state){
  return {
    charges: state.charges
  };
}


export default connect(mapStateToProps)(Charges)
