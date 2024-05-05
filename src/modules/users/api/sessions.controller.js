import validateFields from "../../../libraries/validatefiels.js";
import usersService from "../logic/users.repository.js";

class SessionsController {
  constructor() {
    this.service = usersService;
  }
  requieredfield = {
    register: ['first_name', 'last_name', 'email', 'password'], //'birthday', 
    login: ['email', 'password']
  }

  register = async (req, res) => {
    try {
      const userData = validateFields(req.body, this.requieredfield.register);
      await this.service.register(userData)
      res.sendSuccess({}, "Registro exitoso. Ahora inicia sesión con el usuario registrado")
    } catch (error) { 
      res.sendCatchError(error) }
  }

  login = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.login);
    try {
      const {name, token} = await this.service.login(userData)
      res.sendSuccess({token}, "Log In exitoso con: " + name);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, error.getMessage())
    }
  }

  logout = async (req, res) => {
    this.service.logout()
    res.sendSuccess({},"Cerrado de Sesión existoso")
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  userRecovery = async (req, res, next) => {
    try {    
      const { email } = req.body
      const resp = await this.service.userRecovery(email)
      res.sendSuccess(resp)
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  }
  userRecoveryPassword = async (req, res, next) => {
    try {
      let { password } = req.body
      await this.service.updatePassword(req.user.id, password)
      res.sendSuccess("User updated")
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  }
}

export default SessionsController;