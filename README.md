callback-count [![Build Status](https://travis-ci.org/tjmehta/callback-count.png)](https://travis-ci.org/tjmehta/callback-count)
==============

#### Count callbacks before continuing, tiny control flow helper, allows dynamic counting. 

### Flow control
```js
var counter = createCounter(done);

setTimeout(counter.inc().next, 100);
setTimeout(counter.inc().next, 100);

function done (err) {
  console.log('finished.');
}
```

### .inc() allows you to dynamically update the number of callbacks you are expecting.
```js
var counter = createCounter(done);

counter.inc().inc().inc();
counter.next().next().next();

function done (err) {
  console.log('finished.');
}
```

### The constructor can take an initial value for the count expected
```js
var counter = createCounter(3, done);

counter.next().next().next();

function done (err) {
  console.log('finished.');
}
```

### .next() decrements the count and callsback when the count has reached 0
```js
var counter = createCounter(3, done);

counter.next().next().next();

function done (err) {
  console.log(counter.count); // 0
  console.log('finished.');
}
```

### if .next() receives an error it will callback immediately
```js
var counter = createCounter(3, done);

counter.next(new Error('boom'));

function done (err) {
  console.log(err.message); // boom
}
```

### License: MIT
