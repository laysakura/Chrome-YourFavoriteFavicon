(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
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
  YffSiteIcon["prototype"]["validateIconClass"] = validateIconClass; // validateIconClass(iconClass:String):String

  // --- implements ------------------------------------------
  function setAttributes(attributes) {
    this.urlPattern = attributes.urlPattern;
    this.iconClass = attributes.iconClass;
    this.iconObject = attributes.iconObject;
  }

  function validateIconClass(iconClass) {
    if (iconClass != "YffSimpleIcon") {
      return "" + iconClass + " is not a valid iconClass";
    }
    return null;
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
   module["exports"] = YffSiteIcon;
  }
  global["YffSiteIcon"] = YffSiteIcon;

})((this || 0).self || global);
