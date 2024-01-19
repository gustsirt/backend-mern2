import 'dotenv/config';

//conexion Mongo Atlas a traves de mongoose
//-------------------------------------------------------------------
import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@gustsirt.jaw8omb.mongodb.net/ecommerce?retryWrites=true&w=majority`,
  );
  console.log('Base de datos conectada');
};

//conexion Mongo Atlas session
//-------------------------------------------------------------------
import session from 'express-session';
import MongoStore from 'connect-mongo';

export const sessionAtlas = (app) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@gustsirt.jaw8omb.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        mongoOptions: {
          //useNewUrlParser: true, // estas 2opciones luego ya son por defecto y no es necesario ponerlo
          //useUnifiedTopology: true,
        },
        ttl: 3600, // milisegundos --> hs
      }),
      secret: process.env.SECRETCODE,
      resave: true,
      saveUninitialized: true,
    })
  );
};
