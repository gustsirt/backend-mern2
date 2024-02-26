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
}