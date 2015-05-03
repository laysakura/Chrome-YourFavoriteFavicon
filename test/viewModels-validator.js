var assert = require('power-assert')
var YffValidator = require("../src/viewModels/validator");

var yffValidator = new YffValidator();

describe('#isValidHtmlColorCode', function() {
  it('should return true when valid color code (3-digit) is given', function() {
    assert.ok(yffValidator.isValidHtmlColorCode("#0aF"));
  });
  it('should return true when valid color code (6-digit) is given', function() {
    assert.ok(yffValidator.isValidHtmlColorCode("#0aFdec"));
  });

  it('should return false when invalid color code (4-digit) is given', function() {
    assert.ok(!yffValidator.isValidHtmlColorCode("#0aF6"));
  });
  it('should return false when invalid color code (non-hex) is given', function() {
    assert.ok(!yffValidator.isValidHtmlColorCode("#00G"));
  });
});
