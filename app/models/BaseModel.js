const { Model } = require('objection')
const uuid = require('uuid/v4')

class BaseModel extends Model {
  async $beforeInsert (context) {
    await super.$beforeInsert(context)
    this.uuid = uuid()
  }
}

module.exports = BaseModel
