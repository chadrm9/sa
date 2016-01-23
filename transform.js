var through = require('through2')
var transform = through(write, end)

process.stdin.pipe(transform).pipe(process.stdout)

function write (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase())
  next()
}

function end (done) {
  done()
}
