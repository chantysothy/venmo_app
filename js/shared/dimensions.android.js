var ExtraDimensions = require('react-native-extra-dimensions-android');

module.exports = function() {
  var height = ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT');
  var width = ExtraDimensions.get('REAL_WINDOW_WIDTH');
  return { height, width };
}
