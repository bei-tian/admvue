const dbConfig = require('../../../config/db')
let knex = require('knex')(dbConfig)
knex.prefix = dbConfig.prefix

module.exports = knex