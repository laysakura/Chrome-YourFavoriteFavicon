var assert = require('power-assert');
var data_driven = require('data-driven');
var YffSiteIcon = require("../src/models/siteIcon");
var YffSimpleIcon = require("../src/models/simpleIcon");

describe('#validateUrlPattern', function() {
  context("with correct url pattern", function() {
    data_driven([
      { pattern: 'www.example.com' },
      { pattern: '*' },
      { pattern: '(www.)example.com' },
    ], function() {
      it('should be valid', function(ctx) {
        assert.equal(null, YffSiteIcon.prototype.validateUrlPattern(ctx.pattern));
      });
    });
  });

  context("with empty url", function() {
    it('should be invalid', function() {
      assert.equal("must not be empty", YffSiteIcon.prototype.validateUrlPattern(""));
    });
  });

  context("with incorrect url pattern", function() {
    data_driven([
      { pattern: '(www.example.com' },
    ], function() {
      it('should be invalid', function(ctx) {
        assert.notEqual(null, YffSiteIcon.prototype.validateUrlPattern(ctx.pattern));
      });
    });
  });
});

describe('#validateIconClass', function() {
  it('should be valid when passed "YffSimpleIcon"', function() {
    assert.equal(null, YffSiteIcon.prototype.validateIconClass("YffSimpleIcon"));
  });

  it('should be invalid when passed not-registered class name', function() {
    assert.equal("YffRainbowIcon is not a valid iconClass", YffSiteIcon.prototype.validateIconClass("YffRainbowIcon"));
  });
});

describe('#validateIconObject', function() {
  context('iconClass == "YffSimpleIcon"', function() {
    var iconClass = "YffSimpleIcon";

    it("should be invalid when object is not a YffSimpeIcon", function() {
      assert.equal("iconObject is not an iconClass", YffSiteIcon.prototype.validateIconObject(iconClass, {}));
    });

    it("should be invalid when an object invalid as YffSimpeIcon is passed", function() {
      var simpleIcon = new YffSimpleIcon();
      simpleIcon.setAttributes({ bgColor: "#abcd" });
      assert.notEqual(null, YffSiteIcon.prototype.validateIconObject(iconClass, simpleIcon));
    });

    it("should be valid when an object valid as YffSimpeIcon is passed", function() {
      var simpleIcon = new YffSimpleIcon();
      simpleIcon.setAttributes({ bgColor: "#abc" });
      assert.equal(null, YffSiteIcon.prototype.validateIconObject(iconClass, simpleIcon));
    });
  });
});
