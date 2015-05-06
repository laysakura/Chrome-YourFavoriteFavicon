var assert = require('power-assert');
var YffSiteIcon = require("../src/models/siteIcon");

describe('#validateIconClass', function() {
  it('should be valid when passed "YffSimpleIcon"', function() {
    assert.equal(null, YffSiteIcon.prototype.validateIconClass("YffSimpleIcon"));
  });

  it('should be invalid when passed not-registered class name', function() {
    assert.equal("YffRainbowIcon is not a valid iconClass", YffSiteIcon.prototype.validateIconClass("YffRainbowIcon"));
  });
});
