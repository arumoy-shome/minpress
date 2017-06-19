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
