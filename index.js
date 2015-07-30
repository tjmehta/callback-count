var exists = require('exists');
var noop = function () {};

function CallbackCounter (count, done) { // or function CallbackCounter (done)
  if (typeof count === 'function') {
    done = count;
    count = null;
  }
  this.count = count || 0;
  this.done  = done  || noop;
  this.results = [];
  this.next = this.next.bind(this);
}
CallbackCounter.prototype.inc = function (inc) {
  inc = exists(inc) ? inc : 1;
  this.count += inc;
  return this;
};
CallbackCounter.prototype.next = function (err) { // function (err, results...)
  var results;
  if (this.err) {
    return this; // already errored
  }
  else if (err) {
    this.err = err;
    this.done(err);
  }
  else {
    if (this.count > 0) this.count--;
    results = Array.prototype.slice.call(arguments, 1);
    this.results.push(results);
    if (this.count === 0) {
      this.done(null, this.results);
    }
  }
  return this;
};

module.exports = function createCounter (count, done) { // or function (done)
  return new CallbackCounter(count, done);
};