'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, before, beforeEach, describe, it } = exports.lab = Lab.script()
const knex = require('knex')(require('../../knexfile'))
const QueuedTest = require('../../app/models/QueuedTest')
const { init } = require('../../app/server')

describe('POST /tests', () => {
  let server

  before(async () => {
    server = await init()
  })

  beforeEach(async () => {
    await knex.migrate.latest()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('returns a 400 error if the request does not specify the URL to test', async () => {
    const res = await server.inject({ method: 'post', url: '/tests' })

    expect(res.statusCode).to.equal(400)
  })

  it('returns a 202 if the request is successful', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/tests',
      payload: { url: 'https://www.easally.com' }
    })

    expect(res.statusCode).to.equal(202)
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

  it('stores the queued test in the database', async () =>  {
    await server.inject({
      method: 'post',
      url: '/tests',
      payload: { url: 'https://www.google.com' }
    })

    const allQueuedTests = await QueuedTest.query()

    expect(allQueuedTests.length).to.equal(1)
    expect(allQueuedTests[0].url).to.equal('https://www.google.com')
  })
})
