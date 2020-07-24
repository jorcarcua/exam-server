const mongoose = require('mongoose')


const db = ({config, logger}) => ({
    start : () => {
        mongoose.connect(config.DATABASE_URL, { useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });
        let db = mongoose.connection;
    
        db.on('error', (error) => logger.error(error));
        db.once('open', () => logger.info('connected to database'));
        return db;  
    }
})

  
module.exports = db;