import "dotenv/config";
import { Router } from "express";
import {
  CustomError,
  validateFields,
  renderPage,
  resJson,
  resError
} from "../../helpers/index.js";
import { UserClass } from "../../daos/index.js";
import { createHash, isValidPassword } from "../../helpers/passwords.js";
import passport from "passport";
import { authenticationToken, createToken } from "../../helpers/jwt.js";

const router = Router();

const users = new UserClass();

// POST http://localhost:PORT/api/sessions/register
router.post('/register', async (req, res) => {
  try {
    const requieredfield = ['first_name', 'last_name', 'email', 'password'];
    const userData = validateFields(req.body, requieredfield);
    userData.password = createHash(userData.password)

    const userFound = await users.getUserByMail(userData.email);

    if (userFound) throw new CustomError(`Ya existe un usuario con ese email. pruebe con otro`,400,'POST /api/sessions/register')

    const user = await users.createUser(userData)

    renderPage(res,"login","Login",{control: {answer: 'Se ha registrado satisfactoriamente' }});

  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      renderPage(res,"register","Nuevo Registro",{control: {answer: error.message }});
    } else {
      renderPage(res,"register","Nuevo Registro",{control: {answer: 'Ocurrio un error, vuelva a intentarlo'}});
    }
  }
});

// POST http://localhost:PORT/api/sessions/login
router.post('/login', async (req, res) => {
  const requieredfield = ['email', 'password'];
  const userData = validateFields(req.body, requieredfield);

  try {
    if (userData.email == process.env.USER_ADMIN && isValidPassword(userData.password, {password: process.env.USER_ADMIN_PASS}) ) {
      // req.session.user = {
      //   first_name: "Admin",
      //   email: userData.email,
      //   role: "Admin"
      // };
      const token = createToken({id: 0, role: "Admin"})
      resJson(res, 200, "Log In exitoso", token)
      // res.token = token
      // return res.redirect('/products');
    }

    const userFound = await users.getUserByMail(userData.email);
    if (!userFound || isValidPassword(createHash(userData.password), userFound)) {
      throw new CustomError(`Email o contraseña equivocado`,400,'POST .../api/sessions/login');
    }
    
    // req.session.user = {
    //   user: userFound._id,
    //   first_name: userFound.first_name,
    //   last_name: userFound.last_name,
    //   email: userFound.email,
    //   role: userFound.role,
    // };
    const token = createToken({id: userFound._id, role: userFound.role})
    resJson(res, 200, "Log In exitoso", token)
    // res.token = token
    // res.redirect('/products');

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
  //req.session.user = req.user

  const token = createToken({id: req.user._id, role: req.user.role})
  resJson(res, 200, "Log In a traves de Github exitoso", token)
  //res.redirect('/products');
})

// GET http://localhost:PORT/api/sessions/logout
router.get('/logout', (req, res) => {
  // req.session.destroy((err) => {
  //   if (err) return res.send({ status: 'error', error: err });
  // });
  res.redirect('/');
});

// GET http://localhost:PORT/api/sessions/current
router.get('/api/sessions/current', authenticationToken,(req, res) => {
  res.send("Datos sensibles")
})

export default router;
