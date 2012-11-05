"use strict";

var Signal = require("./type")

function signal(generator) {
  /**
  Signal takes `generator` function and passes `next` function into it
  calling which will emit new values on resulting signal.

  ## Example

      var time = signal(function(next) {
        setInterval(function() {
          next(Time.now())
        ), 1000)
      })

      watch(time, console.log)
  **/
  return new Signal(generator)
}

module.exports = signal
