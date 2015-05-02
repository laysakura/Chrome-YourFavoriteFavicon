(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  var YFF_CONST = require("../miscs/consts");

  // --- define / local variables ----------------------------

  // --- class / interfaces ----------------------------------
  function YffValidator() {}

  YffValidator["prototype"]["isValidHtmlColorCode"] = isValidHtmlColorCode; // isValidHtmlColorCode(color:String):Boolean
  YffValidator["prototype"]["isValidLocalImg"] = isValidLocalImg; // isValidHtmlColorCode(localImg:Object):Boolean

  // --- implements ------------------------------------------
  function isValidHtmlColorCode(color) {
    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color);
  }

  function isValidLocalImg(localImg) {
    return localImg.type.match(YFF_CONST.uploadImgTypePattern);
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YffValidator;
  }
  global["YffValidator"] = YffValidator;

})((this || 0).self || global);
