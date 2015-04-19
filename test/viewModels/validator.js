var assert = require('power-assert')
var Yffvalidator = require("../../src/viewModels/validator");

var yffvalidator = new Yffvalidator();

describe('#isValidHtmlColorCode', function() {
  it('should return true when valid color code (3-digit) is given', function() {
    console.log(yffvalidator.constructor.prototype)
    assert.ok(yffvalidator.isValidHtmlColorCode("#0aF"));
  });
  it('should return true when valid color code (6-digit) is given', function() {
    console.log(yffvalidator.constructor.prototype)
    assert.ok(yffvalidator.isValidHtmlColorCode("#0aFdec"));
  });

  it('should return false when invalid color code (4-digit) is given', function() {
    console.log(yffvalidator.constructor.prototype)
    assert.ok(!yffvalidator.isValidHtmlColorCode("#0aF6"));
  });
  it('should return false when invalid color code (non-hex) is given', function() {
    console.log(yffvalidator.constructor.prototype)
    assert.ok(!yffvalidator.isValidHtmlColorCode("#00G"));
  });
});
