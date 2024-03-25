import { Router } from "express";

import ProductCRouter from "./api/products.route.js";
import MessagesCRouter from "./api/messages.route.js";
import CartCRouter from "./api/cart.route.js";
import UserCRouter from "./api/users.route.js";
import sessionsRoute from "./api/sessions.route.js";
import mailRoute from "./api/mail.route.js";
import { routerPruebas } from "./api/pruebas.route.js";
import dirname from '../utils/dirname.js'
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
router.use('/api/products', (new ProductCRouter()).getRouter())
router.use('/api/carts', (new CartCRouter()).getRouter())
router.use('/api/sessions', sessionsRoute);
router.use('/api/messages', (new MessagesCRouter()).getRouter())
router.use('/api/mail', mailRoute)
router.use('/api/users', (new UserCRouter()).getRouter());
router.use('/api/pruebas', routerPruebas) //mocking


router.use('*', (req, res) => res.status(404).send('Not Found'))
router.use((err, req, res) => {
  req.logger.error(err)
  res.status(500).json({message: "Error Server", err})})

export default router;