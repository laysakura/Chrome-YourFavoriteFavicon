var assert = require('power-assert')
var YffSettings = require("../../src/models/settings");

var yffSettings = new YffSettings();

describe('#isValidBgColor', function() {
  it('should return true when valid color code (3-digit) is given', function() {
    console.log(yffSettings.constructor.prototype)
    assert.ok(yffSettings.isValidBgColor("#0aF"));
  });
  it('should return true when valid color code (6-digit) is given', function() {
    console.log(yffSettings.constructor.prototype)
    assert.ok(yffSettings.isValidBgColor("#0aFdec"));
  });

  it('should return false when invalid color code (4-digit) is given', function() {
    console.log(yffSettings.constructor.prototype)
    assert.ok(!yffSettings.isValidBgColor("#0aF6"));
  });
  it('should return false when invalid color code (non-hex) is given', function() {
    console.log(yffSettings.constructor.prototype)
    assert.ok(!yffSettings.isValidBgColor("#00G"));
  });
});
