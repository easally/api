/**
 * Add routes to the given server instance
 *
 * @param {server} server
 * @returns {Promise}
 */
const addRoutes = async (server) => {
  server.route({ method: 'GET', path: '/', handler: () => 'Hello world!' })
  return server
}

module.exports = addRoutes
