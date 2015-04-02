(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------

  // --- class / interfaces ----------------------------------
  function YffSettings() {}

  YffSettings["prototype"]["isValidBgColor"] = isValidBgColor; // isValidBgColor(bg_color:String):Boolean

  // --- implements ------------------------------------------
  function isValidBgColor(bg_color) {
    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(bg_color);
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YffSettings;
  }
  global["YffSettings"] = YffSettings;

})((this || 0).self || global);


// Model functions

function yffIsValidLocalImg(local_img) {
  return local_img.type.match(YFF_UPLOAD_IMG_TYPE_PATTERN);
}

function yffIsValidSettings(settings) {
  return Array.isArray(settings.icon_settings);
}

function yffGetCurrentDbObject() {
  chrome.storage.local.get(null, function(settings) {
    console.log('Raw current Db object:');
    console.log(settings);
    if (yffIsValidSettings(settings)) return settings;
    return yffGetInitialSettings();
  });
}

function yffGetInitialSettings() {
  return {
    icon_settings: [],
  };
}

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
