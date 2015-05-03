(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  var UrlPattern = require('url-pattern')

  // --- class / interfaces ----------------------------------
  function YffUrl() {}

  YffUrl["prototype"]["matchedUrlPatternsFromBest"] = matchedUrlPatternsFromBest; // matchedUrlPatternsFromBest(patternStrs:Array):Array

  // --- implements ------------------------------------------
  function matchedUrlPatternsFromBest(patternStrs, url) {
    var results = []

    patternStrs.forEach(function(patternStr, index) {
      console.log(patternStr)
      var pattern = new UrlPattern(patternStr);
      var matched = pattern.match(url);
      if (matched) { results.push(patternStr); }
    });

    return results;
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YffUrl;
  }
  global["YffUrl"] = YffUrl;

})((this || 0).self || global);
