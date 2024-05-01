import winston from 'winston'
import program from '../../config/commander.js'
const {mode} = program.opts();

// mode == 'development'
// ? app.use(addLoggerDevelopment)
// : app.use(addLoggerProduction);

/* export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: 'http'}),
    new winston.transports.File({filename: 'errors.log', level: 'warn'})
  ]
}) */

/* export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)


  next()
} */

const customOption = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal:'red',
    error:'red',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white'
  }
}
const transportOption = {
  development: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({colors: customOption.colors}),
        winston.format.simple()
      )
    }),
  ],
  production: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({colors: customOption.colors}),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'error',
      format: winston.format.simple()
    })
  ]
}

export const logger = winston.createLogger({
  levels: customOption.levels,
  transports: transportOption[mode]
})

export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)


  next()
}