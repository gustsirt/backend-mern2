import { Router } from "express";
import MailController from "../../controller/mail.controller.js";
import { handleAuth } from "../../middleware/handlePoliciesPASP.js";

const router = Router();
const sControl = new MailController()

// http://localhost:PORT/api/mail/
router
  .post('/send',  handleAuth(['USER']), sControl.send)

export default router;