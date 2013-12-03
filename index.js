
/*!
 *
 * stream-jaccard
 *
 * calculate jaccard index for two sorted streams of data
 *
 * MIT
 *
 */

/**
 * Module dependencies.
 */

var capture = require('domain-capture');
var count = require('count-stream');
var joins = require('stream-joins');
var union = joins.union;
var intersect = joins.intersect;

/**
 * Expose `jaccard`.
 */

module.exports = capture(jaccard);

/**
 * Calculates Jaccard index for sorted
 * streams `a` and `b`, using optional
 * property `key` for objects.
 *
 * @param {String} [key]
 * @param {Stream} a
 * @param {Stream} b
 * @param {Function} fn
 * @api private
 */

function jaccard(key, a, b, fn){
  if ('string' != typeof key) {
    fn = b;
    b = a;
    a = key;
    key = 'key';
  }

  var cnt = 2;
  var i, u;

  intersect(key, a, b).pipe(count(function(x){
    i = x;
    --cnt || calc();
  }));

  union(key, a, b).pipe(count(function(x){
    u = x;
    --cnt || calc();
  }));

  function calc(){
    var index = u > 0
      ? i / u
      : 0;
    fn(null, index, 1 - index);
  }
}
