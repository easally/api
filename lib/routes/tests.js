const Joi = require('@hapi/joi')
const QueuedTest = require('./../models/QueuedTest')

module.exports = [
  {
    method: 'POST',
    path: '/tests',
    options: {
      validate: {
        payload: Joi.object({
          url: Joi.string().uri({ scheme: ['http', 'https'] }).required()
        })
      }
    },
    handler: async (request, h) => {
      const test = await QueuedTest.query().insert({
        url: request.payload.url
      })

      return h.response().code(202).location(`/queued-tests/${test.uuid}`)
    }
  }
]
