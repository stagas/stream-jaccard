
/**
 * Example.
 */

var es = require('event-stream');
var jaccard = require('./');

// generate two streams
function toObject(key){ return { key: key }; }
var a = es.readArray([1,2,3,4,5,6,7,8,9,10].map(toObject));
var b = es.readArray([1,2,3,4,5,6].map(toObject));

// calculcate jaccard index and distance for the streams
jaccard(a, b, function(err, index, distance){
  console.log(index); // => 0.6
  console.log(distance); // => 0.4
});
