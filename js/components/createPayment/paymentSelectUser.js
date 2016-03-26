'use strict';

import React, {
  Component,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ListView,
  Image,
  Platform,
} from 'react-native';

var Spinner = require('react-native-spinkit');

import { connect } from 'react-redux/native';
import { fetchUsersSearch, clearUsersSearch } from '../../actions/userSearchActions';
import { pay } from '../../actions/paymentActions';
import { initBraintreeWithToken } from '../../shared/braintree';

import TitleBar from '../titleBar/titleBar';
import { green } from '../../constants/colors';
var LoadingOverlay = require('../../shared/loadingOverlay');

var styles = require('./paymentSelectUserStyles');
var textStyles = require('../../shared/textStyles');

class PaymentSelectUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      note: "",
      to: null,
    }
  }

  componentWillMount() {
    initBraintreeWithToken();
  }

  render() {
    if (this.state.to) {
      var toView =
      <TouchableOpacity style={styles.targetNameContainer}
        onPress={() => this._clearSearch()}>
        <Text style={[textStyles.text, styles.targetNameText]}>
          {this.state.to.display_name}
        </Text>
      </TouchableOpacity>
      var noteView =
        <View style={styles.noteContainer}>
          <TextInput
            style={[textStyles.text, styles.textInput, styles.textInputNote]}
            onChangeText={(note) => this.setState({note: note})}
            placeholder="What's it for?"
            value={this.state.note}
            ref="textInputNote"
            multiline
          />
        </View>
    } else {
      var toView = <TextInput
        style={[textStyles.text, styles.textInput, styles.textInputTo]}
        onChangeText={(q) => this._fireSearch(q)}
        placeholder="Enter a name"
        autoCapitalize="none"
        autoFocus={true}
        autoCorrect={false}
        value={this.state.query}
      />

      // if query is null or blank, don't show result container
      var resultsContainer = this.state.query === "" || this.state.query === null ? null :
        <View style={styles.searchResultsContainer}>
          <ListView style={styles.searchResults}
            dataSource={this.props.searchResultsDataSource}
            keyboardShouldPersistTaps={true}
            renderRow={(r) => this._renderSearchResult(r)} />
        </View>;
    }

    if (Platform.OS == 'ios') {
      var iosSpinner = <Spinner style={styles.spinner}
        isVisible={this.props.paymentIsFetching} size={100}
        type='Pulse' color={green} />
      var androidSpinner = null;
    } else {
      var iosSpinner = null;
      if (this.props.paymentIsFetching) {
        var androidSpinner = (<LoadingOverlay isVisible={this.props.paymentIsFetching} />);
      } else {
        var androidSpinner = null;
      }
    }

    return(
      <View style={styles.container}>
        {iosSpinner}
        <TitleBar text={"£" + this.props.amount.replace("-", "")}
          back={() => this.props.navigator.pop()}
          forwardText={this.props.amount < 0 ? "Request" : "Pay"}
          forwardDisabled={!(this.state.to && this.state.note.length > 0) || this.props.paymentIsFetching }
          forward={() => this._submitPayment()}/>
        <View style={styles.row}>
          <Text style={[textStyles.text, styles.text]}>To:</Text>
          {toView}
        </View>
        {noteView}
        {resultsContainer}
        {androidSpinner}
      </View>
    );
  }

  _fireSearch(query) {
    this.setState({
      query,
    });

    var email = this.props.user.user.email;
    var token = this.props.user.authentication_token;
    this.props.dispatch(fetchUsersSearch(email, token, query));
  }

  _clearSearch() {
    this.props.dispatch(clearUsersSearch());

    this.setState({
      query: "",
      to: null,
    })
  }

  _renderSearchResult(result) {
    var user = result.user;

    return(
      <TouchableOpacity onPress={() => {
        this.setState({to: user});
        this.refs.textInputNote.focus();
      }}
        style={styles.searchResult}>
        <Image style={styles.resultPhoto} source={{uri: user.profile_photo_url}}/>
        <Text style={[textStyles.text, styles.resultName]}>
          {user.display_name}
        </Text>
      </TouchableOpacity>
    );
  }

  _submitPayment() {
    this.refs.textInputNote.blur();
    this.props.dispatch(pay(this.props.user, {
      note: this.state.note,
      other_id: this.state.to.id,
      amount: this.props.amount,
      audience: "public",
    }, this.props.navigator));
  }
}

function mapStateToProps(state) {
  const dataSource = new React.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  return {
    user: state.user.params,
    searchResultsDataSource: dataSource.cloneWithRows(state.userSearchResults.results),
    paymentIsFetching: state.payment.isFetching,
  };
}

export default connect(mapStateToProps)(PaymentSelectUser)
