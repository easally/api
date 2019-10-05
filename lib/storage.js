const Knex = require('knex')
const knexConfig = require('./../knexfile')
const { Model } = require('objection')

exports.init = () => {
  Model.knex(Knex(knexConfig))
}
