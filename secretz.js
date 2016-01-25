var through = require('through')
var gunzip = require('zlib').createGunzip()

var tar = require('tar')
var parser = tar.Parse()

var crypto = require('crypto')
var stream = crypto.createDecipher(process.argv[2], process.argv[3])

parser.on('entry', function (e) {
  if (e.type !== 'File') return

  function write(data) {
    this.queue(data.toString() + ' ' + e.path + '\n')
  }
  e.pipe(crypto.createHash('md5', {encoding: 'hex'}))
   .pipe(through(write))
   .pipe(process.stdout)

})

process.stdin.pipe(stream).pipe(gunzip).pipe(parser)
