"use strict";

var signal = require("../signal")
var watch = require("watchables/watch")
var unwatch = require("watchables/unwatch")

exports["test signal events"] = function(assert, done) {
  var actual = []
  var s = signal(function(next) {
    setTimeout(function() {
      next(1)
      next(2)
      next(3)
      assert.deepEqual(actual, [1, 2, 3], "all values were accumulated")
      done()
    })
  })

  watch(s, function(value) {
    actual.push(value)
  })
}

exports["test signal only changes"] = function(assert, done) {
  var actual = []
  var s = signal(function(next) {
    setTimeout(function() {
      next(1)
      next(1)
      next(2)
      next(2)
      next(2)
      next(3)
      next(3)
      assert.deepEqual(actual, [1, 2, 3], "all values were accumulated")
      done()
    })
  })

  watch(s, function(value) {
    actual.push(value)
  })
}

exports["test signal valueOf"] = function(assert, done) {
  var actual = []
  var s = signal(function(next) {
    setTimeout(function() {
      next(1)
      assert.deepEqual(actual, [1], "first value accumulated")
      assert.equal(s.valueOf(), 1, "currently value is 1")
      next(2)
      assert.deepEqual(actual, [1, 2], "second value accumulated")
      assert.equal(s.valueOf(), 2, "currently value is 2")
      next(3)
      assert.deepEqual(actual, [1, 2, 3], "all values were accumulated")
      assert.equal(s.valueOf(), 3, "currently value is 3")
      done()
    })
  })

  watch(s, function(value) {
    actual.push(value)
  })
}

exports["test signal self argument"] = function(assert, done) {
  var actual = []
  signal(function(next, self) {
    watch(self, function(value) { actual.push(value) })
    setTimeout(function() {
      next(1)
      assert.deepEqual(actual, [1], "first value accumulated")
      assert.equal(self.valueOf(), 1, "currently value is 1")
      next(2)
      assert.deepEqual(actual, [1, 2], "second value accumulated")
      assert.equal(self.valueOf(), 2, "currently value is 2")
      next(3)
      assert.deepEqual(actual, [1, 2, 3], "all values were accumulated")
      assert.equal(self.valueOf(), 3, "currently value is 3")
      done()
    })
  })
}

require("test").run(exports)
