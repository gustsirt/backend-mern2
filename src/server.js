import express from 'express';
import configMongo from './config/mongo.js';

import __dirname from './libraries/dirname.js';
import cors from 'cors';
import { addLogger, logger } from './libraries/middleware/logger.js';
import handleResponses from './libraries/middleware/handleResponses.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import appRouter from './config/routes.js'
import dotenv from 'dotenv';

dotenv.config()

// App initialization ------------------------------
const app = express();

// App Configurations --------------------------------
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// App Data Source Configuration --------------------------------
configMongo.connectDB();

// App Middleware --------------------------------
app.use(cors());
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
