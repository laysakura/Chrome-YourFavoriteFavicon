(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  const YFF_CONST = {
    iconSize: 16,
    iconDataUrlFormat: 'image_png',
    iconLinkType: 'image/png',
    uploadImgTypePattern: /^image\/(png|jpeg|gif)$/,
  };

  // --- class / interfaces ----------------------------------
  // --- implements ------------------------------------------
  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YFF_CONST;
  }
  global["YFF_CONST"] = YFF_CONST;

})((this || 0).self || global);
