const { Router } = require('./router')
const { Response } = require('./response')
const http = require('http')
const methods = ['GET', 'POST', 'PUT', 'DELETE']

class App {
  constructor() {
    this.router = new Router();
  }

  get(url, callback) {
    this.router.route('GET', url, callback)
  }

  post(url, callback) {
    this.router.route('POST', url, callback)
  }

  put(url, callback) {
    this.router.route('PUT', url, callback)
  }

  delete(url, callback) {
    this.router.route('DELETE', url, callback)
  }

  all(path, callback) {
    methods.forEach((method) => {
      this.router.route(method, path, callback);
    })
  }

  handle (req, res) {
    try {
      this.router.handle(req, res)
    } catch (e) {
      if (e.status) {
        res.send(e.status, e.message)
      } else {
        throw e
      }
    }
  }
}

exports.App = App;

App.prototype.listen = function (port) {
  self = this;

  const server = http.createServer((req, res) => {
    self.handle(req, res);
  });

  server.listen(port);
};
