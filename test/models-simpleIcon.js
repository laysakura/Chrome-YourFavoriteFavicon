var assert = require('power-assert');
var YffSimpleIcon = require("../src/models/simpleIcon");

describe('#validateBgColor', function() {
  it('should be invalid when passed invalid color code', function() {
    assert.equal("Valid color code is like #987 or #123abc", YffSimpleIcon.prototype.validateBgColor("#00G"));
  });
});
