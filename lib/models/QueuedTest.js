const BaseModel = require('./BaseModel')

class QueuedTest extends BaseModel {
  async $beforeInsert (context) {
    await super.$beforeInsert(context)
    this.queued_at = new Date()
  }

  static tableName () {
    return 'queued_tests'
  }
}

module.exports = QueuedTest
