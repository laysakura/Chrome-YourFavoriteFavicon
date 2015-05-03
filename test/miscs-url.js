var assert = require('power-assert')
var data_driven = require('data-driven')

var YffUrl = require("../src/miscs/url");

var yffUrl = new YffUrl();

describe('#matchedUrlPatternsFromBest', function() {
  context('with top-level url', function() {
    var url = 'www.example.com';

    // patterns that should match
    data_driven([
      { patterns: ['www.example.com'] },
      { patterns: ['*.example.com'] },
      { patterns: ['www.example.com*'] },
      { patterns: ['*'] },
    ], function() {
      it('should return a matched pattern', function(ctx) {
        assert.deepEqual([ctx.patterns[0]], yffUrl.matchedUrlPatternsFromBest(ctx.patterns, url));
      })
    })

    // patterns that should not match
    data_driven([
      { patterns: ['www.example.jp'] },
    ], function() {
      it('should return a matched pattern', function(ctx) {
        assert.deepEqual([], yffUrl.matchedUrlPatternsFromBest(ctx.patterns, url));
      })
    })
  })

  // [TODO] - URL自身の優先度が全く同じなら、先頭要素から先に返ることのテスト
});
