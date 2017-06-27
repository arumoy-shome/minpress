const assert = require('assert')
const App = require('../lib/app').App
const { Response } = require('../lib/response')

describe('App', () => {
  beforeEach(() => {
    this.app = new App()
  })

  it('handle GET', () => {
    let called

    this.app.get('/', () => { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(called)
  })

  it('handle POST', () => {
    let called

    this.app.post('/', () => { called = true })

    this.app.handle({ method: 'POST', url: '/' }, {})

    assert(called)
  })

  it('handle PUT', () => {
    let called

    this.app.put('/', () => { called = true })

    this.app.handle({ method: 'PUT', url: '/' }, {})

    assert(called)
  })

  it('handle DELETE', () => {
    let called

    this.app.delete('/', () => { called = true })

    this.app.handle({ method: 'DELETE', url: '/' }, {})

    assert(called)
  })

  it('handle all methods', () => {
    let called

    this.app.all('/', () => { called = true })

    this.app.handle({ method: 'DELETE', url: '/' }, {})

    assert(called)
  })

  it('res has send method', () => {
    let res

    this.app.get('/', (_req, _res) => { res = _res })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(res.send)
  })

  it('error is caught', () => {
    const err = new Error('Ouch')
    err.status = 500

    this.app.get('/', () => { throw err })

    let status
    let body

    this.app.handle({ method: 'GET', url: '/' },
      { // Response object (res)
        send: (_status, _body) => {
          status = _status
          body = _body
        },
      })

    assert.equal(status, err.status)
    assert.equal(body, err.message)
  })

  xit('call middlewares', () => {
    let called

    this.app.use((req, res, next) => { next() })
    this.app.use(() => { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})

    assert(called)
  })
})
