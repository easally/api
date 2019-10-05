'use strict'

const BaseModel = require('./../../app/models/BaseModel')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { describe, it } = exports.lab = Lab.script()

describe('BaseModel', () => {
  it('generates the uuid property', async () => {
    const pattern = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i')
    const model = new BaseModel()

    await model.$beforeInsert(null)

    expect(pattern.test(model.uuid)).to.be.true()
  })
})
