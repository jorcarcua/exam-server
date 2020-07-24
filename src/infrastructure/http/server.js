const express = require('express'); 
 
const server = ({config, database, router, logger, errorHandler, auth_middlewares, BaseError}) => ({
    start: () => { 
        logger.info('Starting server');
        database.start();
        let app = express(); 
       
        app.use(auth_middlewares.authMiddleware);
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use('/v1/', router); 
        app.use((err, req, res, next) => {    
             errorHandler.handleError(err,res)
        });
        app.use((err, res, next) => {
            errorHandler.notFoundHandler(err,res, next)
        });
         
        const port = config.PORT
        app.listen(port, ()=> { 
            logger.info(`listening in port ${port}`)
        })
       
    }
})


module.exports = server