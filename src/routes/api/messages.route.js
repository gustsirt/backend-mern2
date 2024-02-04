import { Router } from "express";
import MessagesController from "../../controller/messages.controller.js";

const router = Router();

const mControl = new MessagesController()

// DELETE http://localhost:PORT/api/messages
router.delete('/', mControl.clearMessages)

export default router;