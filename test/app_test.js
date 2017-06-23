var assert = require('assert')
var App = require('../lib/app').App
var Response = require('../lib/response').Response

describe('App',() => {
  beforeEach(() => {
    this.app = new App()
  })

  it('handle GET',() => {
    var called

    this.app.get('/',() => { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(called)
  })

  it('handle POST',() => {
    var called

    this.app.post('/',() => { called = true })

    this.app.handle({ method: 'POST', url: '/' }, {})

    assert(called)
  })

  it('handle PUT', () => {
    var called

    this.app.put('/',() => { called = true })

    this.app.handle({ method: 'PUT', url: '/' }, {})

    assert(called)
  })

  it('handle DELETE', () => {
    var called

    this.app.delete('/', () => { called = true })

    this.app.handle({ method: 'DELETE', url: '/' }, {})

    assert(called)
  })

  it('handle all methods', () => {
    var called

    this.app.all('/', () => { called = true })

    this.app.handle({ method: 'DELETE', url: '/' }, {})

    assert(called)
  })

  it('res has send method', () => {
    var res

    this.app.get('/', (_req, _res) => { res = _res })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(res.send)
  })

  it('error is caught',  () => {
    var err = new Error('Ouch')
    err.status = 500

    this.app.get('/', () => { throw err })

    var status, body
    this.app.handle({ method: 'GET', url: '/' },
      { // Response object (res)
        send: (_status, _body) => {
          status = _status
          body = _body
        }
      })

    assert.equal(status, err.status)
    assert.equal(body, err.message)
  })

  xit('call middlewares', () => {
    var called

    this.app.use((req, res, next) => { next() })
    this.app.use(function() { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(called)
  })
})
