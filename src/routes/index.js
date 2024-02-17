import { Router } from "express";
import viewsRouter from './views.route.js'
import productsRoute from "./api/products.route.js";
import messagesRoute from "./api/messages.route.js";
import sessionsRoute from "./api/sessions.route.js";
import cartRouter from "./api/cart.route.js";

import handleResponses from "../middleware/handleResponses.js";

const router = Router()

// definiendo vistas
router.use('/', viewsRouter);

// definiendo las API
router.use('/api/products/', handleResponses, productsRoute);
router.use('/api/carts/', handleResponses, cartRouter);
router.use('/api/sessions/', handleResponses, sessionsRoute);
router.use('/api/messages', handleResponses, messagesRoute);
router.use('/api/users/', () => {});

router.use('*', (req, res) => res.status(404).send('Not Found'))
router.use((err, req, res, next) => res.status(500).json({message: "Error Server", err}))

export default router;