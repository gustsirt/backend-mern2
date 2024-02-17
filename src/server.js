import program from './config/commander.js';
import configObj from './config/index.js'
import express from 'express';
import {createServer} from 'node:http'
import serverIO from './helpers/serverIO.js';
import cookieParser from 'cookie-parser'
import appRouter from './routes/index.js'
import __dirname from './utils/dirname.js';
import handlebars from 'express-handlebars';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const {mode} = program.opts();
console.log('Mode config: ' + mode);

const port = process.env.PORT;
const app = express();
const server = createServer(app);

// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser(configObj.cookies_code))

// serverIo(server);
serverIO(server);
configObj.connectDB();

// session
//sessionAtlas(app);

// passport
initializePassport()
app.use(passport.initialize())

// handlebars
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(appRouter);

server.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});
