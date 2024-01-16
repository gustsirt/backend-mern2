import { Router } from "express";
import viewsRouter from './views.route.js'
import { productsRoute, sessionsRoute } from "./api/index.js";

const router = Router()

// definiendo vistas
router.use('/', viewsRouter);

// definiendo las API
router.use('/api/products/', productsRoute);
router.use('/api/carts/', ()=>{});

router.use('/api/sessions/', sessionsRoute);
router.delete('/api/messages', ()=>{});

// router.get("/pruebas", (req, res) => {
//   res.send(createHash(""))
// })

export default router;