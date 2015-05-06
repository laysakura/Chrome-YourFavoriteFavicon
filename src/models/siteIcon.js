(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  var UrlPattern = require("url-pattern");

  // --- define / local variables ----------------------------
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

  // used as class method
  YffSiteIcon["prototype"]["validateUrlPattern"] = validateUrlPattern; // validateUrlPattern(urlPattern:String):String
  YffSiteIcon["prototype"]["validateIconClass"] = validateIconClass; // validateIconClass(iconClass:String):String
  YffSiteIcon["prototype"]["validateIconObject"] = validateIconObject; // validateIconObject(iconClass:String):String

  // --- implements ------------------------------------------
  function setAttributes(attributes) {
    this.urlPattern = attributes.urlPattern;
    this.iconClass = attributes.iconClass;
    this.iconObject = attributes.iconObject;
  }

  function validateUrlPattern(urlPattern) {
    if (urlPattern.length == 0) { return "must not be empty"; }

    try { new UrlPattern(urlPattern); }
    catch (e) { return "Invalid URL pattern: " + e; }

    return null;
  }

  function validateIconClass(iconClass) {
    if (iconClass != "YffSimpleIcon") {
      return "" + iconClass + " is not a valid iconClass";
    }
    return null;
  }

  function validateIconObject(iconClass, iconObject) {
    if (iconClass != iconObject.constructor.name) {
      return "iconObject is not an iconClass";
    }

    var errorMessages = iconObject.validateAll();
    if (Object.keys(errorMessages).length > 0) {
      return "some errors exist: " + errorMessages;
    }
    return null;
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
   module["exports"] = YffSiteIcon;
  }
  global["YffSiteIcon"] = YffSiteIcon;

})((this || 0).self || global);
