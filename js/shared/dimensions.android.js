var ExtraDimensions = require('react-native-extra-dimensions-android');

module.exports = function() {
  var wheight = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
  var statusbarheight = ExtraDimensions.get('STATUS_BAR_HEIGHT');
  var softbarheight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
  var width = ExtraDimensions.get('REAL_WINDOW_WIDTH');
  height = wheight - statusbarheight - softbarheight
  return { height, width };
}
