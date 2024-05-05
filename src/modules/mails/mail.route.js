import { Router } from "express";
import MailController from "./mail.controller.js";
import { handleAuth } from "../../libraries/middleware/handlePoliciesPASP.js";

const router = Router();
const sControl = new MailController()

// http://localhost:PORT/api/mail/
router
  .post('/send',  handleAuth(['USER']), sControl.send)

export default router;