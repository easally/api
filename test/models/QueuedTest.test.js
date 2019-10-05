'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { beforeEach, describe, it } = exports.lab = Lab.script()

const QueuedTest = require('./../../lib/models/QueuedTest')
const status = require('./../../lib/constants/testStatus')

describe('QueuedTest', () => {
  let model

  beforeEach(() => {
    model = new QueuedTest()
  })

  it('generates the queued_at property', async () => {
    await model.$beforeInsert(null)

    expect(model.queued_at).to.be.date()
  })

  it('generates the status property', async () => {
    await model.$beforeInsert(null)

    expect(model.status).to.equal(status.QUEUED)
  })

  // Smoke-test, to ensure the parent method is called
  it('generates the uuid property', async () => {
    await model.$beforeInsert(null)

    expect(model.uuid).to.not.be.null()
  })
})
