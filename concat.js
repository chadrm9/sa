var concat = require('concat-stream')

process.stdin.pipe(concat(function (body) {
  var result = body.toString().split('').reverse().join('')
  process.stdout.write(result)
}))
