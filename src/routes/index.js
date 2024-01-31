import { Router } from "express";
import viewsRouter from './views.route.js'
import productsRoute from "./api/products.route.js";
import sessionsRoute from "./api/sessions.route.js";

import UsersCRouter from "./api/usersClass.router.js";
import handleResponses from "../middleware/handleResponses.js";

const router = Router()
const usersRouter = new UsersCRouter();

// definiendo vistas
router.use('/', viewsRouter);

// definiendo las API
router.use('/api/products/', handleResponses, productsRoute);
router.use('/api/carts/', ()=>{});

router.use('/api/sessions/', sessionsRoute);
router.delete('/api/messages', ()=>{});

router.use('/api/users/', usersRouter.getRouter());

export default router;