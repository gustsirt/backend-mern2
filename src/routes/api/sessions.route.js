import { Router } from "express";
//import passport from "passport";

import SessionsController from "../../controller/sessions.controller.js";
import { handleAuth } from "../../middleware/handlePoliciesPASP.js";


const router = Router();
const sControl = new SessionsController();

// http://localhost:PORT/api/sessions/
router
  .post('/register', sControl.register)
  .post('/login', sControl.login)
  .get ('/logout', sControl.logout)
  .get ('/user', handleAuth(['USER', 'USER_PREMIUM', 'ADMIN']), sControl.getUserSession)
  .post('/userrecovery', sControl.userRecovery)
  .put ('/userrecovery', handleAuth(["USER"]), sControl.userRecoveryPassword)

// TODO PRUEBAS
router.get('/current', handleAuth(['ADMIN']), (req, res) => {
  res.send({message: "Datos sensibles", reqUser: req.user})
})

// GITHUB API
//router.get('/github', passport.authenticate('github', {scope:['user:email']}), sControl.github)
//router.get('/githubcallback', passport.authenticate('github', {session: false, failureRedirect: '/'}), sControl.githubcallback)

export default router;
