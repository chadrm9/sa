var stream = require('duplexer2')
var through = require('through2').obj

module.exports = function (counter) {
  var counts = {}
  var input = through(write, end)
  return stream(input, counter)

  function write (row, _, next) {
    counts[row.country] = (counts[row.country] || 0) + 1
    next()
  }
  function end (done) {
    counter.setCounts(counts)
    done()
  }
}