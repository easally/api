'use strict'

const server = require('./server')
const storage = require('./storage')

storage.init()
server.start()
