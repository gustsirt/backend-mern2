import "dotenv/config";
import { Router } from "express";
import {
  CustomError,
  validateFields,
  renderPage
} from "../../helpers/index.js";
import { UserClass } from "../../daos/index.js";
import { createHash, isValidPassword } from "../../helpers/passwords.js";
import passport from "passport";

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

    if (req.body.uadmin) userData.admin = true;

    await users.createUser(userData)

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
      renderPage(res,"login","Login",{control: {answer: error.message }});
    } else {
      renderPage(res,"login","Login",{control: {answer: 'Ocurrio un error, vuelva a intentarlo'}});
    }
  }
});

// POST http://localhost:PORT/api/sessions/github
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{})

// POST http://localhost:PORT/api/sessions/githubcallhub
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/'}),(req, res)=>{
  req.session.user = req.user

  res.redirect('/products');
})

// GET http://localhost:PORT/api/sessions/logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ status: 'error', error: err });
  });
  res.redirect('/');
});

export default router;
