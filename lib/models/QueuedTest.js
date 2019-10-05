const BaseModel = require('./BaseModel')
const status = require('./../constants/testStatus')

class QueuedTest extends BaseModel {
  async $beforeInsert (context) {
    await super.$beforeInsert(context)

    this.queued_at = new Date()
    this.status = status.QUEUED
  }

  static tableName () {
    return 'queued_tests'
  }
}

module.exports = QueuedTest
