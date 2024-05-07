import multer from "multer";
import { logger } from "./logger.js";
import __dirname from '../dirname.js';
import { dirname } from 'path'

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    const folderName = file.originalname.includes('perfil')
    ? 'profiles'
    : file.originalname.includes('producto') 
    ? 'products'
    : 'documents';
    cb(null, `${__dirname}/public/uploads/${folderName}`)
  },
  filename: function(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
  },
  onError: function(err,next){
      logger.error(err)
      next()
  }
})

const uploader = multer({ storage });

export default uploader;