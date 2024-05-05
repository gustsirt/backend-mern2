import express from 'express';
import program from './config/commander.js';
import configObj from './config/env.js'
import configMongo from './config/mongo.js';

import __dirname from './libraries/dirname.js';
//import serverIO from './helpers/serverIO.js';
import cors from 'cors';
import { addLogger, logger } from './libraries/middleware/logger.js';
import handleResponses from './libraries/middleware/handleResponses.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import appRouter from './config/routes.js'

// App initialization ------------------------------
const {mode} = program.opts();
logger.info('Mode: ' + mode);
const app = express();
//const server = createServer(app); //para IO server

// App Configurations --------------------------------
const port = configObj.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
//app.use(cookieParser(configObj.cookies_code))

// App Data Source Configuration --------------------------------
configMongo.connectDB();

// App Middleware --------------------------------
app.use(cors()); //{ origin: configObject.cors_origin }
app.use(addLogger)
app.use(handleResponses)

// passport
initializePassport()
app.use(passport.initialize())

// App Routes --------------------------------
app.use(appRouter);

// App Listen --------------------------------
app.listen(port, (err) => {
  if (err) { logger.fatal("Error fatal en server: ", err); }
  logger.info(`Server andando en port ${port}`);
});
