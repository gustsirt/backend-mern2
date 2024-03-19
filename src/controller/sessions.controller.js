import configObject from "../config/index.js";
import createToken from "../utils/createToken.js";
import CustomError from "../services/errors/errors.js";
import { createHash, isValidPassword } from "../utils/passwords.js";
import validateFields from "../utils/validatefiels.js";

import { UserClass } from "../dao/factory.js";
import sendEmailwithLayout from "../utils/sendMail.js";
const userService = new UserClass();

class SessionsController {
  constructor() {
    this.service = userService;
  }
  requieredfield = {
    register: ['first_name', 'last_name', 'email', 'birthday', 'password'],
    login: ['email', 'password']
  }
  admins = configObject.uadmins || []
  admin_pass = configObject.uadmin_pass

  register = async (req, res) => {
    try {
      const userData = validateFields(req.body, this.requieredfield.register);
      userData.password = createHash(userData.password)
  
      const userFound = await userService.getBy({email: userData.email});
  
      if (userFound) throw new CustomError(`Ya existe un usuario con ese email. pruebe con otro`)
  
      await userService.create(userData)
  
      res.sendSuccess({}, "Registro exitoso. Ahora inicia sesión con el usuario registrado")
      // res.renderPage("login","Login", {answer: 'Se ha registrado satisfactoriamente' })
  
    } catch (error) {
      res.sendCatchError(error)
      // if (error instanceof CustomError) {
      //   res.renderPage("register","Nuevo Registro", {answer: error.message })
      // } else {
      //   res.renderPage("register","Nuevo Registro", {answer: 'Ocurrio un error, vuelva a intentarlo' })
      // }
    }
  }  // Respuesta Visual

  login = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.login);
  
    try {
     // Admin Verification
      if (this.admins.includes(userData.email)) {
        if (isValidPassword(userData.password, {password: this.admin_pass})) {
          const token = createToken({id: 0, role: "admin"})
          return res.sendSuccess({token}, "Successful login with: Administrator User")
        } else {
          throw new CustomError(`Email o contraseña equivocado`);
        }
      }
  
      // User Verification
      const userFound = await this.service.getBy({email: userData.email});
      if (!userFound || !isValidPassword(userData.password, userFound)) {
        throw new CustomError(`Email o contraseña equivocado`);
      }
      
      const token = createToken({id: userFound._id, role: userFound.role})

      //res.sendTokenCookieSuccess(token, {})
      res.sendSuccess({token}, "Log In exitoso con: " + userFound.first_name);
  
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error)
    }
  } // OK

  logout = () => {
    //res.clearCookie('token').redirect('/');
  }

  getUserSession = (req, res) => {
    res.sendSuccess(req.user)
  }

  userRecovery = async (req, res, next) => {
    try {    
      const { email } = req.body
      const userFound = await this.service.getBy({email});
      const token = createToken({id: userFound._id, role: userFound.role}, '1h')

      // enviar mail de recuperación
      const user = { name: userFound.first_name, email: userFound.email}
      const subject   = 'Recuperar Contraseña'
      const options = {
        user,
        url: `${configObject.cors_origin}/#/recoverypassword`,
        token
      }
      const resp = await sendEmailwithLayout(options, subject, "recoveryUser")
      
      res.sendSuccess(resp)
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  }
  userRecoveryPassword = async (req, res, next) => {
    try {
      let { password } = req.body
      password = createHash(password)
      await this.service.update({_id: req.user.id}, {password})
      
      res.sendSuccess("User updated")
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  }

  // GITHUB
  github = async ()=>{}
  githubcallback = (req, res)=>{
    const token = createToken({id: req.user._id, role: req.user.role})
    
    res.tokenCookie(token).redirect('/products');
  }
}

export default SessionsController;