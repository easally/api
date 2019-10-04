'use strict'

const Hapi = require('@hapi/hapi')
const server = Hapi.server({ host: 'localhost', port: 3000 })

const routes = [
  ...require('./routes/home'),
  ...require('./routes/tests')
]

routes.forEach(route => server.route(route))

exports.init = async () => {
  await server.initialize()
  return server
}

exports.start = async () => {
  await server.start()
  console.log(`Server running at ${server.info.uri}`)
  return server
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
