const { ServerResponse } = require('http')

// Our own Response class.
// We make `res` inherit from this to add our own helper methods.
class Response extends ServerResponse {
  constructor() {
    super()
    this.contentType = 'text/html'
  }

  // Helper to send a response.
  // Usage:
  //   res.send('body')
  //   res.send(404, 'Not found')
  send(status, body) {
    if (body == null) {
      body = status
      status = 200
    }

    this.writeHead(status, {
      'Content-Length': body.length,
      'Content-Type': this.contentType
    })

    this.end(body)
  }

  render(file, locals) {
    this.app.render(file, locals, (html) => {
      this.send(html)
    })
  }
}

// Response.prototype = Object.create(http.ServerResponse.prototype)
// Response.prototype.constructor = Response
exports.Response = Response




