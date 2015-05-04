(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  "use strict";

  var popupMain = require('./viewModels/popup');

  $(window).load(popupMain);
}());

},{"./viewModels/popup":2}],2:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
