import 'dotenv/config'
import express from 'express';

import {createServer} from 'node:http'
// const serverIo = require('./middleware/serverIO.js');
import cookieParser from 'cookie-parser'
import appRouter from './routes/index.js'
import { __dirname } from './helpers/index.js';
import handlebars from 'express-handlebars';
import { connectDB, sessionAtlas } from './config/index.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const port = process.env.PORT;
const app = express();
const server = createServer(app);

// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser(process.env.SECRET_CODE))

// serverIo(server);
connectDB();

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
