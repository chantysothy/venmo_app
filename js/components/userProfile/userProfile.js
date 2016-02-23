//
// 'use strict';
//
// import React, {
//   Component,
//   Text,
//   View,
//   Image,
//   TouchableHighlight,
//   Navigator,
// } from 'react-native';
//
// import { connect } from 'react-redux/native';
//
// var Icon = require('react-native-vector-icons/Ionicons');
// var ScrollableTabView = require('react-native-scrollable-tab-view');
//
// var textStyles = require('../../shared/textStyles');
//
// class UserProfile extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <ProfileSummary
//           user={this.props.user}
//           balance={this.props.balance} />
//         <NavigationsMenu navigator={this.props.navigator} />
//       </View>
//     );
//   }
// }
//
// class ProfileSummary extends Component {
//   render() {
//     var imageUrl = this.props.user.profile_photo_url;
//     var fullName = this.props.user.first_name + " " + this.props.user.last_name;
//     var balance = this.props.balance;
//     return (
//       <View style={styles.profile}>
//         <Image
//           style={styles.profilePhoto}
//           source={{uri: imageUrl }} />
//         <View
//           style={styles.rightContainer}>
//           <Text style={styles.profileName}> { fullName } </Text>
//           <Text style={styles.profileName}> { balance.balance_formatted } </Text>
//         </View>
//       </View>
//     )
//   }
// }
//
// function mapStateToProps(state){
//   return {
//     user: state.user
//   };
// }
//
//
// export default connect(mapStateToProps)(UserProfile)
