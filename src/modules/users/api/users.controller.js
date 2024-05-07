import CustomController from "../../../libraries/custom/controller.js";
import usersService from "../logic/users.repository.js";

export default class UsersController extends CustomController {
  constructor() {
    super(usersService);
  }
  switchRole = async ( req, res ) => {
    try {
      const {uid} = req.params
      const {role} = req.params
      if ( role != "admin" && role != "user_premium") return res.sendUserError('Rol incorrecto')
      const userData = await this.service.switchRole(uid, role)

      res.sendSuccess(userData)
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  delete = async ( req, res ) => {
    try {
      const { hs } = req.query
      const element = await this.service.delete(hs);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
}