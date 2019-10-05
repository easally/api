'use strict'

const QueuedTest = require('./../../lib/models/QueuedTest')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { describe, it } = exports.lab = Lab.script()

describe('QueuedTest', () => {
  it('generates the queued_at property', async () => {
    const model = new QueuedTest()

    await model.$beforeInsert(null)

    expect(model.queued_at).to.be.date()
  })

  // Smoke-test, to ensure the parent method is called
  it('generates the uuid property', async () => {
    const model = new QueuedTest()

    await model.$beforeInsert(null)

    expect(model.uuid).to.not.be.null()
  })
})
