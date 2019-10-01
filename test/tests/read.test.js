'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script()
const { init } = require('../../src/server')

describe('GET /tests/{id}', () => {
  let server

  beforeEach(async () => {
    server = await init()
  })

  afterEach(async () => {
    await server.stop()
  })

  it('returns a 404 if the test cannot be found', async () => {
    const res = await server.inject({ method: 'get', url: '/tests/1234' })

    expect(res.statusCode).to.equal(404)
  })
})
