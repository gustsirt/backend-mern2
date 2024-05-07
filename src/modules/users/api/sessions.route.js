import { Router } from "express";

import SessionsController from "./sessions.controller.js";
import { handleAuth } from "../../../libraries/middleware/handlePoliciesPASP.js";

const router = Router();
const sControl = new SessionsController();

// http://localhost:PORT/api/sessions/
router
  .post('/register', sControl.register)
  .post('/login', sControl.login)
  .post('/logout', sControl.logout)
  .get ('/user', handleAuth(['USER', 'USER_PREMIUM', 'ADMIN']), sControl.getUserSession)
  .post('/userrecovery', sControl.userRecovery)
  .put ('/userrecovery', handleAuth(["USER"]), sControl.userRecoveryPassword)

export default router;
