(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  var YffValidationError = require("../errors/validationError");

  // --- class / interfaces ----------------------------------

  // Model class of such object.
  //
  // {
  //   urlPattern: "*.example.jp",
  //   iconClass: "YffLocalImgIcon",  // One of "YffSimpleIcon", "YffLocalImgIcon"
  //   iconObject: <YffLocalImgIcon object>,  // One of <YffSimpleIcon object>, <YffLocalImgIcon object>
  // }
  function YffSiteIcon() {}

  YffSiteIcon["prototype"]["setAttributes"] = setAttributes; // setAttributes(attributes:Object):void, may throw YffValidationError
  YffSiteIcon["prototype"]["validate"] = validate; // validate():void, may throw YffValidationError

  YffSiteIcon["prototype"]["_validateIconClass"] = _validateIconClass; // _validateIconClass(iconClass:String):String

  // --- implements ------------------------------------------
  function setAttributes(attributes) {
    this.urlPattern = attributes.urlPattern;
    this.iconClass = attributes.iconClass;
    this.iconObject = attributes.iconObject;
  }

  function validate() {
    var errorAttributes = {};
    var errorMessage;

    errorMessage = _validateIconClass(this.iconClass);
    if (errorMessage) { errorAttributes.iconClass = errorMessage; }

    if (Object.keys(errorAttributes).length > 0) { throw new YffValidationError("Error!", YffSiteIcon, errorAttributes); }
  }

  function _validateIconClass(iconClass) {
    if (iconClass != "YffSimpleIcon") {
      return "Not a valid iconClass: " + iconClass;
    }
    return null;
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
   module["exports"] = YffSiteIcon;
  }
  global["YffSiteIcon"] = YffSiteIcon;

})((this || 0).self || global);
