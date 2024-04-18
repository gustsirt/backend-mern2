import program from './config/commander.js';
import configObj from './config/index.js'

//import {createServer} from 'node:http'
import express from 'express';
import cors from 'cors';
import passport from 'passport';

//import serverIO from './helpers/serverIO.js';
import __dirname from './utils/dirname.js';
import appRouter from './routes/index.js'
import initializePassport from './config/passport.config.js';
import handleResponses from './middleware/handleResponses.js';
import { addLogger, logger } from './utils/logger.js';

const {mode} = program.opts();


const app = express();
//const server = createServer(app); //para IO server

// configuraciones de la App
app.use(cors());
//app.use(cors({ origin: 'http://localhost:5173/' }));

//app.use(cookieParser(configObj.cookies_code))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(addLogger)

logger.info('Mode: ' + mode);
app.use(handleResponses)

//serverIO(server);
configObj.connectDB();

// passport
app.use(passport.initialize())
initializePassport()

app.use(appRouter);

const port = process.env.PORT;
//server.listen(port, (err) => { //para IO server

//export const appListen = () => {
  //return
  app.listen(port, (err) => {
  if (err) { logger.fatal("Error fatal en server: ", err); }
  logger.info(`Server andando en port ${port}`);
});
//}
//appListen()
