var through = require('through2')
var split = require('split2')

var lineCount = 0
var transform = through(function (buffer, _, next) {
  var line = buffer.toString()
  this.push(lineCount % 2 === 0
    ? line.toLowerCase() + '\n'
    : line.toUpperCase() + '\n'
  )
  lineCount++
  next()
})

process.stdin.pipe(split()).pipe(transform).pipe(process.stdout)
