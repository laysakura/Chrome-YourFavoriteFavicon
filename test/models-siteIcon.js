var assert = require('power-assert');
var YffValidationError = require("../src/errors/validationError");
var YffSimpleIcon = require("../src/models/simpleIcon");
var YffSiteIcon = require("../src/models/siteIcon");

describe('#validate', function() {
  var yffSiteIcon;
  var attributes;

  beforeEach(function(done) {
    yffSiteIcon = new YffSiteIcon();
    attributes = {
      iconClass: YffSimpleIcon
    };
    done();
  });

  it('should not throw any error with valid attributes', function() {
    yffSiteIcon.setAttributes(attributes);
    assert.doesNotThrow(function () { yffSiteIcon.validate(); });
  });

  describe('iconClass attribute', function() {
    beforeEach(function(done) {
      delete attributes.iconClass;
      done();
    });

    it('should not throw any error with YffSimpleIcon', function() {
      attributes.iconClass = YffSimpleIcon;
      yffSiteIcon.setAttributes(attributes);
      assert.doesNotThrow(function () { yffSiteIcon.validate(); });
    });

    it('should throw YffValidationError when not set', function() {
      yffSiteIcon.setAttributes(attributes);
      assert.throws(function () { yffSiteIcon.validate(); }, YffValidationError);
    });

    it('should throw YffValidationError when with invalid class', function() {
      attributes.iconClass = Object;
      yffSiteIcon.setAttributes(attributes);
      assert.throws(function () { yffSiteIcon.validate(); }, YffValidationError);
    });
  });
});
