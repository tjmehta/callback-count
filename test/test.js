'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var createCount = require('../index');

describe('callback-count', function () {
  it('should callback immediately if not inc', function (done) {
    var count = createCount(done);
    count.next();
  });
  it('should not callback all nexts have been called', function (done) {
    var count = createCount(done);
    count.inc().inc().inc();
    count.next().next().next();
  });
  it('should accept a count and not callback until the count is reached',
    function (done) {
      var count = createCount(3, done);
      count.next().next().next();
    }
  );
  it('should accept no arguments', function (done) {
    var count = createCount();
    expect(count.count).to.equal(0); // default value
    count.inc().inc();
    expect(count.count).to.equal(2);
    count.next().next();
    expect(count.count).to.equal(0);
    done();
  });
  it('should accept a number in inc', function (done) {
    // throws an error in lab if `done` is called twice
    var count = createCount(done);
    count.inc(2);
    count.next().next();
  });
  it('should callback with the first error that occurs', function (done) {
    var count = createCount(checkError);
    count.inc().inc().inc();
    var err1 = new Error('1');
    var err2 = new Error('2');
    var err3 = new Error('3');
    count.next(err1).next(err2).next(err3);
    function checkError (err) {
      expect(err).to.exist();
      expect(err.message).to.equal('1');
      done();
    }
  });
});
