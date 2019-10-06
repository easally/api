'use strict'

const Hapi = require('@hapi/hapi')
const Knex = require('knex')(require('./../knexfile'))
const { Model } = require('objection')

// -----------------------------------------------------------------------------
// Create the server instance
// -----------------------------------------------------------------------------
const server = Hapi.server({ host: 'localhost', port: 3000 })

// -----------------------------------------------------------------------------
// Load the environment variables
// -----------------------------------------------------------------------------
require('./../config/env').init()

// -----------------------------------------------------------------------------
// Initialise the ORM
// -----------------------------------------------------------------------------
Model.knex(Knex)

// -----------------------------------------------------------------------------
// Register the routes
// -----------------------------------------------------------------------------
const routes = [
  ...require('../routes/home'),
  ...require('../routes/tests')
]

routes.forEach(route => server.route(route))

// -----------------------------------------------------------------------------
// Initialise the server
// -----------------------------------------------------------------------------
exports.init = async () => {
  await server.initialize()
  return server
}

// -----------------------------------------------------------------------------
// Start the server
// -----------------------------------------------------------------------------
exports.start = async () => {
  await server.start()
  console.log(`Server running at ${server.info.uri}`)
  return server
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
