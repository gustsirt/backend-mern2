import { Router } from "express";

import sessions       from "../modules/users/api/sessions.route.js";
import Users          from "../modules/users/api/users.route.js";
import ProductCRouter from "../modules/products/api/routes.js";
import CartCRouter from "../modules/carts/api/routes.js";
import mailRoute from "../modules/mails/mail.route.js";
import dirname from '../libraries/dirname.js';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const router = Router()

const swaggerOptions = {
  definition: {
      openapi: '3.0.1',
      info: {
          title: 'Documentación de app BackEndJs',
          description: 'Api Docs para BackEndJs'
      }
  },
  apis: [`${dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)
router.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// definiendo las API
router.use('/api/sessions', sessions);
router.use('/api/users', (new Users()).getRouter());
router.use('/api/products', (new ProductCRouter()).getRouter())
router.use('/api/carts', (new CartCRouter()).getRouter())
router.use('/api/mail', mailRoute)

router.use('*', (req, res) => res.status(404).send('Not Found'))
router.use((err, req, res) => {
  req.logger.error(err)
  res.status(500).json({message: "Error Server", err})})

export default router;