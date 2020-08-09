const config = require('./config')
const logger = require ('./src/infrastructure/logging/logger')
const database = require('./src/infrastructure/database/database')({config: config.database, logger})
const server = require ('./src/interfaces/http')({config: config, logger})
const app  = require('./src/app/application')({config, server, database, logger})

app.start()

 
 
