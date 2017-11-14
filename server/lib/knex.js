const config = require('../config')
let knex = require('knex')(config)
knex.prefix = config.prefix

module.exports = knex