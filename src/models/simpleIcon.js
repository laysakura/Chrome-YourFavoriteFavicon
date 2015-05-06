(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  var YffValidationError = require("../errors/validationError");

  // --- class / interfaces ----------------------------------

  // Model class of such object.
  //
  // {
  //   bgColor: "#a0f",
  // }
  function YffSimpleIcon() {}

  // --- implements ------------------------------------------

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
   module["exports"] = YffSimpleIcon;
  }
  global["YffSimpleIcon"] = YffSimpleIcon;

})((this || 0).self || global);
