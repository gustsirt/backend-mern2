import UsersController from "../../controller/users.controller.js";
import { handleAuth } from "../../middleware/handlePoliciesPASP.js";
import CustomRouter from "./custom.route.js";

const cControl = new UsersController()

export default class UserCRouter extends CustomRouter {
  constructor() {
    super(cControl);
    this.init()
  }
  //http://localhost:8080/api/users
  init() {
    this.get    ('/',       handleAuth(['ADMIN']), this.controller.gets)
    this.get    ('/:eid',   handleAuth(['ADMIN']), this.controller.getId)
    this.get    ('/filter', handleAuth(['ADMIN']), this.controller.getBy)
    this.post   ('/',       handleAuth(['ADMIN']) , this.controller.create)
    this.put    ('/:eid',   handleAuth(['ADMIN']) , this.controller.updateId)
    this.delete ('/:eid',   handleAuth(['ADMIN']) , this.controller.deleteId)
    this.get    ('/premium/:uid', this.controller.switchuser) // realizado por el ejercicio
  }
}