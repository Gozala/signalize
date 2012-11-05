# signalize

[![Build Status](https://secure.travis-ci.org/Gozala/signalize.png)](http://travis-ci.org/Gozala/signalize)

[Functional Reactive Programming][FRP] (FRP) is a programming paradigm for
working with *time-varying* values, better capturing the temporal aspect of
mutable state. Signal is a data structure representing a time-varying value.
For example, consider the position of the mouse. The signal `mousePosition`
represents current mouse position. When the mouse moves, the value changes
automatically.

Signals can also be transformed and combined without typical hazards of the
stateful programs.

# Example

Signal is very low level construct that can be used to create signals from
scratch:

```js
var signal = require("signalize/signal")
var time = signal(function(next) {
  setInterval(function() {
    next(Date.now())
  }, 1000)
})
```

Signals implement [Watchables][] abstraction which allows one to subscribe
and unsubscribe from signal changes:

```js
var watch = require("watchables/watch")
var unwatch = require("watchables/unwatch")

var end = Date.now() +  1000 * 5
watch(time, function onTimechange(value) {
  console.log(value)
  if (end - value <= 0) unwatch(time, onTimechange)
})

// => 1352077824718
// => 1352077825719
// => 1352077826720
// => 1352077827721
// => 1352077828722
// => 1352077829723
```


## Install

    npm install signalize

[FRP]:http://en.wikipedia.org/wiki/Functional_reactive_programming
[Watchables]:https://github.com/Gozala/watchables
