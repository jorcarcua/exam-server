module.exports = ({ config, server, database, logger }) => {
  const actions = require('./actions')({ config: config.authentication });
  return {
    start: () => {
      try {
        database.start();
        server(actions).start();
      } catch (error) {
        logger.error(error.stack);
        process.exit();
      }
    },
  };
};
