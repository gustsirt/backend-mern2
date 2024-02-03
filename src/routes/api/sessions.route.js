import { Router } from "express";
import passport from "passport";

import handleResponses from "../../middleware/handleResponses.js";
import { handleAuthFront } from "../../middleware/handlePoliciesPASP.js";
import SessionsController from "../../controller/sessions.controller.js";

const router = Router();
const sControl = new SessionsController();

// http://localhost:PORT/api/sessions/
router.post('/register', handleResponses, sControl.register);
router.post('/login', handleResponses, sControl.login);
router.post('/loginSession', handleResponses, sControl.loginSession);
router.get ('/logout', sControl.logout);

// GITHUB API
router.get('/github', passport.authenticate('github', {scope:['user:email']}), sControl.github)
router.get('/githubcallback', passport.authenticate('github', {session: false, failureRedirect: '/'}), handleResponses, sControl.githubcallback)

// TODO Pruebas
router.get('/current', handleAuthFront(['USER']), handleResponses, sControl.pruebasCurrent)

export default router;
