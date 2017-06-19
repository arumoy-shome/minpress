var Router = require("./router").Router
var Response = require("./response").Response

function App() {
  this.router = new Router()
}

exports.App = App

var methods = ["GET", "POST", "PUT", "DELETE"]

methods.forEach(function(method) {
  // do a bit of metaprogramming to dynamically generate a method
  // in app to handle the four main HTTP methods
  App.prototype[method.toLowerCase()] = function (url, callback) {
    this.router.route(method, url, callback)
  }
})

App.prototype.handle = function (req, res) {
  res.__proto__ = Response.prototype

  this.router.handle(req, res)
}