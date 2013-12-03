
/**
 * Test.
 */

var es = require('event-stream');
var assert = require('assert');
var jaccard = require('../');

function toObject(key){ return { key: key }; }

describe("jaccard(a, b, fn)", function(){
  it("should calculate jaccard index and distance for two unequal sets", function(done){
    var a = es.readArray([1,2,3,4,5,6,7,8].map(toObject));
    var b = es.readArray([1,2,3,4,5,6,9,10].map(toObject));
    jaccard(a, b, function(err, index, distance){
      assert(0.6 === index);
      assert(0.4 === distance);
      done();
    });
  })

  it("should calculate jaccard index for the two equal sets", function(done){
    var a = es.readArray([1,2,3,4,5,6,7,8,9,10].map(toObject));
    var b = es.readArray([1,2,3,4,5,6,7,8,9,10].map(toObject));
    jaccard(a, b, function(err, index){
      assert(1 === index);
      done();
    });
  })

  it("should work when a stream is empty", function(done){
    var a = es.readArray([1,2,3,4,5,6,7,8,9,10].map(toObject));
    var b = es.readArray([]);
    jaccard(a, b, function(err, index){
      assert(0 === index);
      done();
    });
  })

  it("should work when the other stream is empty", function(done){
    var a = es.readArray([1,2,3,4,5,6,7,8,9,10].map(toObject));
    var b = es.readArray([]);
    jaccard(b, a, function(err, index){
      assert(0 === index);
      done();
    });
  })

  it("should work when both streams are empty", function(done){
    var a = es.readArray([]);
    var b = es.readArray([]);
    jaccard(a, b, function(err, index){
      assert(0 === index);
      done();
    });
  })

  it("should work with objects", function(done){
    var a = es.readArray([1,2,3,4,5,6,7,8,9].map(toObject));
    var b = es.readArray([1,2,3,4,5,6,7,8,10].map(toObject));
    jaccard(a, b, function(err, index){
      assert(0.8 === index);
      done();
    });
  })

  it("should work with objects with another key", function(done){
    function toObject(key){ return { foo: key }; }
    var a = es.readArray([1,2,3,4,5,6,7,8,9].map(toObject));
    var b = es.readArray([1,2,3,4,5,6,7,8,10].map(toObject));
    jaccard('foo', a, b, function(err, index){
      assert(0.8 === index);
      done();
    });
  })
})
