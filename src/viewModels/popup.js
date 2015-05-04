(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  // --- class / interfaces ----------------------------------
  // --- implements ------------------------------------------
  function popupMain() {
    registerEventListners();
  }

  function registerEventListners(yffCanvas, yffValidator) {
    $('#yffOpenOptionsPage').click(function() {
      chrome.runtime.openOptionsPage();
    });
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = popupMain;
  }
  global["popupMain"] = popupMain;

})((this || 0).self || global);
