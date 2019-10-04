const Joi = require('@hapi/joi')

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
    handler: (request, h) => {
      return h.response().code(202).location('/queued-tests/abc-123')
    }
  }
]
