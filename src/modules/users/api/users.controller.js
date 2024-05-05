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
  adddocument = async ( req, res ) => {
    try {
      const {uid} = req.params
      const uploadedFiles = req.files;
      const resp = await this.service.adddocument(uid, uploadedFiles)
      res.sendSuccess(resp)
      //Modificar el endpoint /api/users/premium/:uid   para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
      //Identificación, Comprobante de domicilio, Comprobante de estado de cuenta
      //En caso de llamar al endpoint, si no se ha terminado de cargar la documentación, devolver un error indicando que el usuario no ha terminado de procesar su documentación. 
      //(Sólo si quiere pasar de user a premium, no al revés)

    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
}