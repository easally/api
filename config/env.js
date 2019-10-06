'use strict'

const dotenv = require('dotenv')

exports.init = () => {
  process.env.NODE_ENV === 'test'
    ? dotenv.config({ path: `${__dirname}/../.env.test` })
    : dotenv.config()
}
