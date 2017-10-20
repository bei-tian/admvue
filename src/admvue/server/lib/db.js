const config = require('../../../config/db')
if (config.type === 'mysql') {
  require('./mysql')
}

if (config.type === 'sqlite') {
  require('./sqlite')
}

