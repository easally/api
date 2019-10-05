const statuses = require('./../../lib/constants/testStatus')

exports.up = (knex) => {
  return knex.schema.createTable('queued_tests', table => {
    table.increments()
    table.uuid('uuid').notNullable()
    table.string('url').notNullable()
    table.enu('status', statuses.all).notNullable()
    table.datetime('queued_at').notNullable()
    table.datetime('started_at')
    table.datetime('completed_at')

    table.unique('uuid')
    table.index('url')
    table.index('queued_at')
  })
}

exports.down = (knex) => {}
