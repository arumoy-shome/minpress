const _ = require('underscore')

class Router {
  constructor() {
    this.routes = {}
  }

  route(method, url, callback) {
    // initialize routes[method] to an empty array which is the
    // desired initial state if it is not initialized yet
    this.routes[method] = this.routes[method] || []
    const routes = this.routes[method]

    routes.push({
      // match from beginning to end and
      // make it case insensitive
      regexp: new RegExp(`^${url}$`, 'i'),
      callback
    })
  }

  handle(req, res) {
    // grab the appropriate route matching the method
    // and find the right url using underscore#find
    const routes = this.routes[req.method]
    const route = _.find(routes, r => r.regexp.test(req.url))

    if (route) {
      route.callback(req, res)
    } else {
      const err = new Error('Not Found')
      err.status = 404
      throw err
    }
  }
}

exports.Router = Router
