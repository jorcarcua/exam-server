const mongoose = require('mongoose');

const database = ({ config, logger }) => ({
  start: () => {
    const dbUrl = config.DBURL;
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;

    db.on('error', (error) => logger.error(error));
    db.once('open', () => logger.info('connected to database'));
    return db;
  },
});

module.exports = database;
