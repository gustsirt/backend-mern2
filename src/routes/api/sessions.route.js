import configObject from "../../config/index.js";
import { Router } from "express";
import passport from "passport";
import { UserClass } from "../../dao/index.js";

import { createToken } from "../../jwt/createToken.js";
import authPJwt from "../../jwt/authorization.middleware.js";
import passportCall from "../../jwt/passportCall.middleware.js";

import handleResponses from "../../middleware/handleResponses.js";
import { resCookieJson, resError, renderPage } from "../../helpers/responses.js"; // reemplazado por middleware

import { createHash, isValidPassword } from "../../utils/passwords.js";
import CustomError from "../../utils/errors.js";
import validateFields from "../../utils/validatefiels.js";

const router = Router();

const users = new UserClass();

// OK POST http://localhost:PORT/api/sessions/register
router.post('/register', handleResponses, async (req, res) => {
  try {
    const requieredfield = ['first_name', 'last_name', 'email', 'birthday', 'password'];
    const userData = validateFields(req.body, requieredfield);
    userData.password = createHash(userData.password)

    const userFound = await users.getUserByMail(userData.email);

    if (userFound) throw new CustomError(`Ya existe un usuario con ese email. pruebe con otro`,400,'POST /api/sessions/register')

    const user = await users.createUser(userData)

    res.renderPage("login","Login", {answer: 'Se ha registrado satisfactoriamente' })
    //renderPage(res,"login","Login",{control: {answer: 'Se ha registrado satisfactoriamente' }});

  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      res.renderPage("register","Nuevo Registro", {answer: error.message })
      //renderPage(res,"register","Nuevo Registro",{control: {answer: error.message }});
    } else {
      res.renderPage("register","Nuevo Registro", {answer: 'Ocurrio un error, vuelva a intentarlo' })
      //renderPage(res,"register","Nuevo Registro",{control: {answer: 'Ocurrio un error, vuelva a intentarlo'}});
    }
  }
});

// POST http://localhost:PORT/api/sessions/login
router.post('/login', async (req, res) => {
  const requieredfield = ['email', 'password'];
  const userData = validateFields(req.body, requieredfield);

  try {
    if (userData.email == configObject.uadmin && isValidPassword(userData.password, {password: configObject.uadmin_pass}) ) {

      const token = createToken({id: 0, role: "Admin"})
      return resCookieJson(res, 200, "Log In exitoso", token)
    }

    const userFound = await users.getUserByMail(userData.email);
    if (!userFound || isValidPassword(createHash(userData.password), userFound)) {
      throw new CustomError(`Email o contraseña equivocado`,400,'POST .../api/sessions/login');
    }
    
    const token = createToken({id: userFound._id, role: userFound.role})
    resCookieJson(res, 200, "Log In exitoso", token)

  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      resError(res, 400, "Email o contraseña equivocado")
    } else {
      resError(res, 500, "Ocurrio un error, vuelva a intentarlo")
    }
  }
});

// POST http://localhost:PORT/api/sessions/login SESSION DESUSO
router.post('/loginSession', async (req, res) => {
  const requieredfield = ['email', 'password'];
  const userData = validateFields(req.body, requieredfield);

  try {
    if (userData.email == configObject.uadmin && isValidPassword(userData.password, {password: configObject.uadmin_pass}) ) {
      req.session.user = {
        first_name: "Admin",
        email: userData.email,
        role: "Admin"
      };
      return res.redirect('/products');
    }

    const userFound = await users.getUserByMail(userData.email);
    if (!userFound || isValidPassword(createHash(userData.password), userFound)) {
      throw new CustomError(`Email o contraseña equivocado`,400,'POST .../api/sessions/login');
    }
    
    req.session.user = {
      user: userFound._id,
      first_name: userFound.first_name,
      last_name: userFound.last_name,
      email: userFound.email,
      role: userFound.role,
    };
    
    res.redirect('/products');

  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      resError(res, 400, "Email o contraseña equivocado")
    } else {
      resError(res, 500, "Ocurrio un error, vuelva a intentarlo")
    }
  }
});

// GET http://localhost:PORT/api/sessions/github
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{})

// GET http://localhost:PORT/api/sessions/githubcallhub
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/'}),(req, res)=>{
  req.session.user = req.user

  const token = createToken({id: req.user._id, role: req.user.role})
  // resJson(res, 200, "Log In a traves de Github exitoso", token)
  res.redirect('/products');
})

// GET http://localhost:PORT/api/sessions/logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ status: 'error', error: err });
  });
  res.redirect('/');
});

// GET http://localhost:PORT/api/sessions/current
//router.get('/current', passportCall('jwt'),authPJwt('admin'),(req, res) => {
router.get('/current', handleResponses,(req, res) => {
  //res.send({message: "Datos sensibles", reqUser: req.user})
  const tokenP = "kaslkjaslkjdlkasjdlkajds"
  res.sendTokenCookieSucess("pruebas", tokenP)
})

export default router;
