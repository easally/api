'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script()
const { init } = require('../../src/server')

describe('POST /tests', () => {
  let server

  beforeEach(async () => {
    server = await init()
  })

  afterEach(async () => {
    await server.stop()
  })

  it('returns a 202 if the request is successful', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/tests',
      payload: { url: 'https://www.easally.com' }
    })

    expect(res.statusCode).to.equal(202)
  })

  it('returns a 400 error if the request does not specify the URL to test', async () => {
    const res = await server.inject({ method: 'post', url: '/tests' })

    expect(res.statusCode).to.equal(400)
  })

  it('returns the location of the queued test', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/tests',
      payload: { url: 'https://www.easally.com' }
    })

    const pattern = new RegExp('^/queued-tests/[A-z0-9-]+$')

    expect(pattern.test(res.headers.location)).to.equal(true)
  })
})
