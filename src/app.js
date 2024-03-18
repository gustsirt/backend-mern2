import cluster from 'cluster'
//import { cpus } from 'os'
import { logger } from './utils/logger.js'

import { appListen } from './server.js'

const nCpus = 1 // cpus().length; // se pone en uno para no hacer sobre peso en la PC

if (cluster.isPrimary) {
  logger.info('Primary cluster')
  logger.info('nCpus: ' + nCpus)

  for (let i = 0; i < nCpus; i++) {    
    cluster.fork();
  }
  cluster.on('message', worker => {
    logger.info(`Worker atendiendo - id: ${worker.pid}`)
  })
} else {
  logger.info(`Secondary cluster - id: ${process.pid}`)

  appListen()
}
