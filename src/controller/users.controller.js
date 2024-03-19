import CustomController from "./custom.controller.js";
import { usersService } from "../repository/service.js";

export default class UsersController extends CustomController {
  constructor() {
    super(usersService);
  }

  getDataUserById = async id => {
    const user = await this.service.getBy({_id: id});

    return {
      id: id,
      name: user?.first_name,
      lname: user?.last_name,
      email: user?.email,
      role: user?.role,
      cart: user?.cart,
      ...this.handleAccess(user?.role)
    };
  } // no es un Controler de ROUTER sino de middelware AUTH

  // AUXILIARY
  handleAccess = role => {
    const access = {}
      if (role === 'user_premium') access.accessPremium = true;
    return access
  }

  // cambio de reoles para Desafio Complementario calse 37
  switchuser = async ( req, res) => {
    const {uid} = req.params
    try {
      const user = await this.service.getBy({_id: uid});
      if (!user) return res.sendNotFound('Usuario no encontrado');

      if (user.role == 'user') {
        user.role = 'user_premium';
        user.lastupdated = new Date();
      } else if (user.role == 'user_premium') {
        user.role = 'user'
        user.lastupdated = new Date();
      }
      const newuser = await this.service.update({_id: uid}, user);
      res.sendSuccess({
        _id: newuser._id,
        first_name: newuser.first_name,
        last_name: newuser.last_name,
        email: newuser.email,
        role: newuser.role,
        lastupdated: newuser.lastupdated
      });
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
}