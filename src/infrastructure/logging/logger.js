const winston = require('winston')
const appRoot = require('app-root-path');

const consoleFormatter = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...meta } = info;
    
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
    }),
   );
  
 const fileFormatter = winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A ZZ'
    }),
    winston.format.json()
  )

  const config = {
    console: { 
        handleExceptions:true,
        format: consoleFormatter
      },
      file: {   
        handleExceptions:true,
        filename: `${appRoot}/logs/app.log`, 
        format: fileFormatter
      }
  }
    
    const transports = [
        new winston.transports.File(config.file),
        new winston.transports.Console(config.console)
    ] 
   
    const logger =  winston.createLogger({
        transports
      });
 
      

 module.exports ={
         info:  (text) => {logger.info(text)},
         warn:  (text) => {logger.warn(text)},
         error: (text) => {logger.error(text)}
     }
 


  