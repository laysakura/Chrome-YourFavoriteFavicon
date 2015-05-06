(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  var YffValidator = require("../viewModels/validator");

  // --- class / interfaces ----------------------------------

  // Model class of such object.
  //
  // {
  //   bgColor: "#a0f",
  // }
  function YffSimpleIcon() {}

  YffSimpleIcon["prototype"]["setAttributes"] = setAttributes; // setAttributes(attributes:Object):void, may throw YffValidationError

  // used as class method
  YffSimpleIcon["prototype"]["validateBgColor"] = validateBgColor; // validateBgColor(iconClass:String):String

  // --- implements ------------------------------------------
  function setAttributes(attributes) {
    this.bgColor = attributes.bgColor;
  }

  function validateBgColor(bgColor) {
    if (!YffValidator.prototype.isValidHtmlColorCode(bgColor)) {
      return "Valid color code is like #987 or #123abc";
    }
    return null;
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
   module["exports"] = YffSimpleIcon;
  }
  global["YffSimpleIcon"] = YffSimpleIcon;

})((this || 0).self || global);
