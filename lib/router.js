var _ = require("underscore")

function Router() {
  this.routes = {}
}

exports.Router = Router

Router.prototype.route = function(method, url, callback) {
  // initialize routes[method] to an empty array which is the
  // desired initial state if it is not initialized yet
  var routes = this.routes[method] = this.routes[method] || []

  routes.push({
    // match from beginning to end and
    // make it case insensitive
    regexp: new RegExp("^" + url + "$", "i"),
    callback: callback
  })
}

Router.prototype.handle = function(req, res) {
  // grab the appropriate route matching the method
  // and find the right url using underscore#find
  var routes = this.routes[req.method]
  var route = _.find(routes, function(route) {
    return route.regexp.test(req.url)
  })

  if (route) {
    route.callback(req, res)
  } else {
    var err = new Error("Not Found")
    err.status = 404
    throw err
  }
}
