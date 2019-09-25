const Hapi = require('@hapi/hapi')
const addRoutes = require('./routes')

/**
 * Create a new Hapi server instance
 *
 * @param {*} config
 * @returns {Promise}
 */
const makeServer = async (config) => Hapi.Server(config)

/**
 * Start the given server instance
 *
 * @param {server} server
 * @returns {Promise}
 */
const startServer = async (server) => {
  await server.start()
  return server
}

/**
 * Initialise the application
 *
 * @param {string} host
 * @param {int} port
 * @returns {Promise}
 */
const init = async (host, port) => {
  return makeServer({ host, port })
    .then(addRoutes)
    .then(startServer)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init('localhost', 3000).then(server => {
  console.log(`Server running on ${server.info.uri}`)
})
