"use strict";

var watch = require("watchables/watch")
var unwatch = require("watchables/unwatch")
var event = require("event/event")
var send = require("event/send")

function Signal(generator) {
  /**
  Signal is a data structure representing a time-varying value. For example,
  consider the position of the mouse. The signal `mousePosition` represents
  current mouse position. When the mouse moves, the value changes automatically.
  **/
  var signal = this
  var output = event()
  signal[source] = output

  generator(function next(value) {
    if (signal[state] !== value) {
      signal[state] = value
      send(output, value)
    }
  }, signal)
}

// Signal type has internal property that represents it's current state also
// `valueOf` method is made to return it.
var state = "state@" + module.id
Object.defineProperty(Signal.prototype, state, {
  value: void(0), enumerable: false, configurable: false, writable: true
})
Object.defineProperty(Signal.prototype, "valueOf", {
  value: function valueOf() { return this[state] }
})

// Signal type has internal property that is `event` stream of it's values
// changes.
var source = "event@" + module.id
Object.defineProperty(Signal.prototype, source, {
  value: void(0), enumerable: false, configurable: false, writable: true
})

// Signal implements `watch` and `unwatch` that can be used to subscribe /
// unsubscribe from value changes.
watch.define(Signal, function watchSignal(signal, watcher) {
  return watch(signal[source], watcher)
})
unwatch.define(Signal, function unwatchSignal(signal, watcher) {
  return unwatch(signal[source], watcher)
})


module.exports = Signal
