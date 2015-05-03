var assert = require('power-assert')
var data_driven = require('data-driven')
var YffUrl = require("../src/miscs/url");

var yffUrl = new YffUrl();

describe('#matchedUrlPatternsFromBest', function() {
  context('with top-level url', function() {
    var url = 'www.example.com';

    data_driven([
      // single pattern that should match
      { patterns: ['www.example.com'],
        expected: ['www.example.com']
      },
      { patterns: ['*.example.com'],
        expected: ['*.example.com']
      },
      { patterns: ['www.example.com*'],
        expected: ['www.example.com*']
      },
      { patterns: ['*'],
        expected: ['*']
      },

      // single pattern that should not match
      { patterns: ['www.example.jp'],
        expected: []
      },

      // multiple patterns all of which should match
      { patterns: ['*.example.com', 'www.example.com*', '*', 'www.example.com'],
        expected: ['*.example.com', 'www.example.com*', '*', 'www.example.com']
      },

      // includes matched & unmatched patterns
      { patterns: ['*.example.com', '*.jp', '*'],
        expected: ['*.example.com',         '*']
      },
    ], function() {
      it('should return matched patterns in order', function(ctx) {
        assert.deepEqual(ctx.expected, yffUrl.matchedUrlPatternsFromBest(ctx.patterns, url));
      })
    })
  })
});
