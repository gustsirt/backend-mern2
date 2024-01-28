import dotenv from 'dotenv';
import program from './commander.js';

const opts = program.opts();

dotenv.config({
  path: opts.mode == 'production' ? './.env.production' : './.env.development'
})

import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const configObject = {
  //conexion Mongo Atlas a traves de mongoose
  port: process.env.PORT,
  jwt_code: process.env.JWT_SECRET_CODE,
  cookies_code: process.env.COOKIES_SECRET_CODE,
  mongo_uri: process.env.MONGO_URI,
  uadmin: process.env.USER_ADMIN,
  uadmin_pass: process.env.USER_ADMIN_PASS,
  gh_client_id: process.env.GITHUB_CLIENT_ID,
  gh_client_secret: process.env.GITHUB_CLIENT_SECRET,
  development: opts.mode == 'development',

  connectDB: async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Base de datos conectada');
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
export default configObject