
const config = require('./config')
const logger = require ('./src/infrastructure/logging/logger')
const {BaseError} = require('./src/infrastructure/http/errors/')
const errorHandler = require('./src/infrastructure/http/errors/').errorHandler({logger})
const auth_middlewares = require('./src/infrastructure/authentication/middlewares')
const actions = require('./src/app/actions') 
const router = require('./src/infrastructure/http/router')({logger, auth_middlewares, BaseError, actions})
const database = require('./src/infrastructure/database/database')({config: config.database, logger})
const server = require ('./src/infrastructure/http/server')({config: config.server, database, router, logger, errorHandler, auth_middlewares, BaseError})
 
server.start() 

 
