import dotenv from 'dotenv';
import program from './commander.js';

const opts = program.opts();

dotenv.config({
  path: opts.mode == 'production' ? './.env.production' : './.env.development'
})

import {connect} from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';


const configObject = {
  //conexion Mongo Atlas a traves de mongoose
  port: process.env.PORT,
  jwt_code: process.env.JWT_SECRET_CODE,
  cookies_code: process.env.COOKIES_SECRET_CODE,
  mongo_uri: process.env.MONGO_URI,
  uadmins: process.env.USERS_ADMIN,
  uadmin_pass: process.env.USER_ADMIN_PASS,
  gh_client_id: process.env.GITHUB_CLIENT_ID,
  gh_client_secret: process.env.GITHUB_CLIENT_SECRET,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  development: opts.mode == 'development',

  connectDB: async () => {
    //await mongoose.connect(process.env.MONGO_URI);
    //console.log('Base de datos conectada');
    MongoSingleton.getInstance();
  },

  //conexion Mongo Atlas session
  sessionAtlas: (app) => {
    app.use(
      session({
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          mongoOptions: {
            //useNewUrlParser: true, // estas 2opciones luego ya son por defecto y no es necesario ponerlo
            //useUnifiedTopology: true,
          },
          ttl: 3600, // milisegundos --> hs
        }),
        secret: process.env.COOKIES_SECRET_CODE,
        resave: true,
        saveUninitialized: true,
      })
    );
  },
}

class MongoSingleton {
  static instance //
  constructor() {
    connect(process.env.MONGO_URI);
  }

  static getInstance() {
    if(!this.instance){
      console.log('Conectado a Base de Datos');
      return this.instance = new MongoSingleton();
    }
    console.log('Base de Datos ya conectada');
    return this.instance;
  }
}

export default configObject