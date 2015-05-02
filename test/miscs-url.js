var assert = require('power-assert')
var data_driven = require('data-driven')

var YffUrl = require("../src/miscs/url");

var yffUrl = new YffUrl();

describe('#matchedUrlPatternsFromBest', function() {
  context('with top-level url', function() {
    var url = 'http://www.example.com';

    data_driven([
      { patterns: ['http://www.example.com'] },
      { patterns: ['http://*.example.com'] },
      { patterns: ['*://www.example.com'] },
      { patterns: ['*://*.example.com'] },
    ], function() {
      it('should return a matched pattern', function(ctx) {
        assert.deepEqual([ctx.patterns[0]], yffUrl.matchedUrlPatternsFromBest(ctx.patterns));
      })
    })
  })

  // [TODO] - URL自身の優先度が全く同じなら、先頭要素から先に返ることのテスト
});
