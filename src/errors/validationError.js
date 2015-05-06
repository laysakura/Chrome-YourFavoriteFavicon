(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------

  // --- define / local variables ----------------------------
  // --- class / interfaces ----------------------------------
  function YffValidationError(message, modelClass, errorAttributes) {
    this.message = message;
    this.stack = Error().stack;

    this.modelClass = modelClass;
    this.errorAttributes = errorAttributes;
  }
  YffValidationError.prototype = Object.create(Error.prototype);
  YffValidationError.prototype.constructor = YffValidationError;
  YffValidationError.prototype.name = "YffValidationError";

  // --- implements ------------------------------------------

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
   module["exports"] = YffValidationError;
  }
  global["YffValidationError"] = YffValidationError;

})((this || 0).self || global);
