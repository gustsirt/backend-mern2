import program from './config/commander.js';
import configObj from './config/index.js'

import {createServer} from 'node:http'
import express from 'express';
import cors from 'cors';
import handlebars from 'express-handlebars';
//import cookieParser from 'cookie-parser'
import passport from 'passport';

import serverIO from './helpers/serverIO.js';
import __dirname from './utils/dirname.js';
import appRouter from './routes/index.js'
import initializePassport from './config/passport.config.js';
import handleResponses from './middleware/handleResponses.js';

const {mode} = program.opts();
console.log('Mode config: ' + mode);

const port = process.env.PORT;
const app = express();
const server = createServer(app);

// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cors());
//{ origin: 'http://localhost:5173' }
//app.use(cookieParser(configObj.cookies_code))
app.use(handleResponses)

// serverIo(server);
serverIO(server);
configObj.connectDB();

// passport
app.use(passport.initialize())
initializePassport()

// handlebars
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(appRouter);

server.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});
