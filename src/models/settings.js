// @param icon_settings Array of object.
//   [ { url_pattern: 'http://.*\.example\.com/.*', ... }, .. ]
function yffMatchedIconSettingsInOrder(icon_settings, url) {
  var matched_icon_settings = []
  icon_settings.forEach(function(icon_setting) {
    var url_regex = new RegExp(icon_setting.url_pattern);
    if (url_regex.test(url)) {
      matched_icon_settings.push(icon_setting);
    }
  });
  return matched_icon_settings.sort(function(a, b) {
    // ORDER BY url_pattern.length DESC, updated_at DESC
    if (a.url_pattern.length < b.url_pattern.length) return 1;
    if (a.url_pattern.length > b.url_pattern.length) return -1;
    return a.updated_at < b.updated_at;
  });
}
