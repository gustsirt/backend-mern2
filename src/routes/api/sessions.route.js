import { Router } from "express";
//import passport from "passport";

import SessionsController from "../../controller/sessions.controller.js";
import { handleAuth } from "../../middleware/handlePoliciesPASP.js";


const router = Router();
const sControl = new SessionsController();

// http://localhost:PORT/api/sessions/
router.post('/register', sControl.register);
router.post('/login', sControl.login);
router.get ('/logout', sControl.logout);

// TODO PRUEBAS
router.get('/current', handleAuth(['USER']), (req, res) => {
  res.send({message: "Datos sensibles", reqUser: req.user})
})

// GITHUB API
//router.get('/github', passport.authenticate('github', {scope:['user:email']}), sControl.github)
//router.get('/githubcallback', passport.authenticate('github', {session: false, failureRedirect: '/'}), sControl.githubcallback)

export default router;
