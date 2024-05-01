import {connect} from 'mongoose';
import configObject from './env.js';
import { logger } from '../libraries/middleware/logger.js';

const configMongo = {
  connectDB: async () => {
    MongoSingleton.getInstance();
  },
}


class MongoSingleton {
  static instance //
  constructor() {
    connect(configObject.mongo_uri);
  }

  static getInstance() {
    if(!this.instance){
      logger.info('Conectado a Base de Datos');
      return this.instance = new MongoSingleton();
    }
    logger.info('Base de Datos ya conectada');
    return this.instance;
  }
}

export default configMongo