const assert = require('assert')
const { Router } = require('../lib/router')

describe('Router', () => {
  beforeEach(() => {
    this.router = new Router()
  })

  it('stores routes', () => {
    const callback = () => {}
    this.router.route('GET', '/', callback)
    this.router.route('POST', '/login', callback)

    assert.deepEqual(this.router.routes, {
      GET: [
        {
          regexp: new RegExp('^/$', 'i'),
          callback,
        },
      ],
      POST: [
        {
          regexp: new RegExp('^/login$', 'i'),
          callback,
        },
      ],
    })
  })

  it('handle GET', () => {
    let called = false

    this.router.route('GET', '/hi', () => { called = true })

    this.router.handle({ method: 'GET', url: '/hi' }, {})

    assert(called, 'Should call get route')
  })

  it('handle POST', () => {
    let getCalled
    let postCalled

    this.router.route('GET', '/', () => { getCalled = true })
    this.router.route('POST', '/', () => { postCalled = true })

    this.router.handle({ method: 'POST', url: '/' }, {})

    assert(!getCalled, "Shouldn't call post route")
    assert(postCalled, 'Should call post route')
  })

  it('handle not found', () => {
    const self = this

    assert.throws(() => {
      self.router.handle({ method: 'GET', url: '/' }, {})
    },
    err => err.status === 404,
    'Should throw 404 error')
  })
})
