var combine = require('stream-combiner')
var split = require('split')
var through = require('through')
var zlib = require('zlib')

module.exports = function () {
  var genres;

  function write (buffer) {
    if (buffer.length === 0 ) return
    buffer = JSON.parse(buffer)
    if (buffer.type === 'genre') {
      if (genres)
        this.queue(JSON.stringify(genres) + '\n')

      genres = {name: buffer.name, books: []}
    }
    else
      genres.books.push(buffer.name)
  }

  function end() {
    this.queue(JSON.stringify(genres) + '\n')
    this.queue(null)
  }

  return combine(split(), through(write, end), zlib.createGzip())
}
