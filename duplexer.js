var spawn = require('child_process').spawn
var stream = require('duplexer2')

module.exports = function (cmd, args) {
  var proc = spawn(cmd, args)
  return stream(proc.stdin, proc.stdout)
}
