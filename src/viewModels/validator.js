(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------

  // --- class / interfaces ----------------------------------
  function YffValidator() {}

  YffValidator["prototype"]["isValidHtmlColorCode"] = isValidHtmlColorCode; // isValidHtmlColorCode(color:String):Boolean

  // --- implements ------------------------------------------
  function isValidHtmlColorCode(color) {
    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color);
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YffValidator;
  }
  global["YffValidator"] = YffValidator;

})((this || 0).self || global);
