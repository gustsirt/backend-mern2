import { Router } from "express";
import handleResponses from "../middleware/handleResponses.js";
import { handleAuthFront } from "../middleware/handlePoliciesPASP.js";
import ViewsController from "../controller/views.controller.js";

const router = Router();
const vControl = new ViewsController()

// http://localhost:PORT/
router
  .get("/", handleAuthFront(['PUBLIC']), handleResponses, vControl.login)
  .get("/register", handleAuthFront(['PUBLIC']), handleResponses, vControl.register)
  .get("/products", handleAuthFront(['PUBLIC']), handleResponses, vControl.products)
  .get("/products/:pid", handleAuthFront(['PUBLIC']), handleResponses, vControl.productById)
  .get("/cart", handleAuthFront(['USER', 'USER_PREMIUM']), handleResponses, vControl.cart)
  .get("/realTimeProducts", handleAuthFront(['USER_PREMIUM']), handleResponses, vControl.realTimeProducts)
  .get("/chat", handleAuthFront(['USER', 'USER_PREMIUM']), handleResponses,vControl.chat)
  .get('/user', handleAuthFront(['USER', 'USER_PREMIUM']),handleResponses, vControl.user);

export default router
