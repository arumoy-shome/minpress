var assert = require('assert'),
    App = require('../lib/app').App
    // Response = require('../lib/response').Response

describe('App', function() {
  beforeEach(function() {
    this.app = new App()
  })

  it('handle GET', function() {
    var called

    this.app.get('/', function() { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(called)
  })

it('handle POST', function() {
    var called

    this.app.post('/', function() { called = true })

    this.app.handle({ method: 'POST', url: '/' }, {})

    assert(called)
  })

it('handle PUT', function() {
    var called

    this.app.put('/', function() { called = true })

    this.app.handle({ method: 'PUT', url: '/' }, {})

    assert(called)
  })

it('handle DELETE', function() {
    var called

    this.app.delete('/', function() { called = true })

    this.app.handle({ method: 'DELETE', url: '/' }, {})

    assert(called)
  })

  it('res has send method', function() {
    var res

    this.app.get('/', function(_req, _res) { res = _res })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(res.send)
  })

  xit('error is caught', function () {
    var err = new Error('Ouch')
    err.status = 500

    this.app.get('/', function() { throw err })

    var status, body
    this.app.handle({ method: 'GET', url: '/' },
                    { // Response object (res)
                      send: function(_status, _body) {
                        status = _status
                        body = _body
                      }
                    })

    assert.equal(status, err.status)
    assert.equal(body, err.message)
  })

  xit('call middlewares', function() {
    var called

    this.app.use(function(req, res, next) { next() })
    this.app.use(function() { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(called)
  })
})
