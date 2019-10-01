const Joi = require('@hapi/joi')

const methods = { get: 'GET', post: 'POST' }

/**
 * Add routes to the given server instance
 *
 * @param {server} server
 * @returns {Promise}
 */
const addRoutes = (server) => {
  server.route({
    method: methods.get,
    path: '/',
    handler: () => 'Hello world!'
  })

  server.route({
    method: methods.post,
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
  })

  return server
}

module.exports = { addRoutes }
