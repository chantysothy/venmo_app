'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  View,
  ListView,
  Image,
} from 'react-native';

import { connect } from 'react-redux/native';
import { fetchUsersSearch, clearUsersSearch } from '../../actions/userSearchActions'
import { pay } from '../../actions/paymentActions'

var styles = require('./searchStyles');
var textStyles = require('../../shared/textStyles');

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      note: "",
      to: null,
    }
  }

  componentWillMount() {
  }

  render() {
    if (this.state.to) {
      var toView =
      <TouchableHighlight style={styles.targetNameContainer}
        onPress={() => this._clearSearch()}>
        <Text style={[textStyles.text, styles.targetNameText]}>
          {this.state.to.display_name}
        </Text>
      </TouchableHighlight>
    } else {
      var toView = <TextInput
        style={[textStyles.text, styles.textInput, styles.textInputTo]}
        onChangeText={(q) => this._fireSearch(q)}
        placeholder="Enter a name"
        autoCapitalize="none"
        autoFocus={true}
        value={this.state.query}
      />
      var resultsContainer =
        <View style={styles.searchResultsContainer}>
          <ListView style={styles.searchResults}
            dataSource={this.props.searchResultsDataSource}
            keyboardShouldPersistTaps={true}
            renderRow={(r) => this._renderSearchResult(r)} />
        </View>
    }

    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={textStyles.text}>To:</Text>
          {toView}
        </View>
        <View style={styles.row}>
          <Text style={textStyles.text}>Note:</Text>
          <TextInput
            style={[textStyles.text, styles.textInput, styles.textInputNote]}
            onChangeText={(note) => this.setState({note: note})}
            placeholder="What's it for?"
            returnKeyType="send"
            value={this.state.note}
            ref="textInputNote"
            enablesReturnKeyAutomatically
            onSubmitEditing={() => this._submitPayment()}
          />
        </View>
        {resultsContainer}
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
    var email = this.props.user.user.email;
    var token = this.props.user.authentication_token;

    if (this.state.to === null) {
      // signal some error
    } else {
      this.props.dispatch(pay(email, token, this.state.to.id, this.state.note, this.props.amount))
    }
  }
}

function mapStateToProps(state) {
  const dataSource = new React.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  return {
    user: state.user.params,
    searchResultsDataSource: dataSource.cloneWithRows(state.userSearchResults.results),
  };
}

export default connect(mapStateToProps)(Search)
