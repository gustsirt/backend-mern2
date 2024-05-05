import UsersController from "./users.controller.js";
import uploader from "../../../libraries/middleware/multer.js";
import CustomRouterAuth from "../../../libraries/custom/router.auth.class.js";

const cControl = new UsersController()

export default class UserCRouter extends CustomRouterAuth {
  constructor() {
    super(cControl);
    this.init()
  }
  //http://localhost:8080/api/users
  init() {
    this.get    ('/',       ['ADMIN'], this.controller.gets)
    this.get    ('/:eid',   ['ADMIN'], this.controller.getId)
    this.post   ('/',       ['ADMIN'], this.controller.create)
    this.put    ('/:eid',   ['ADMIN'], this.controller.updateId)
    this.delete ('/:eid',   ['ADMIN'], this.controller.deleteId)
    this.get    ('/access/:uid/:role', ['PUBLIC'], this.controller.switchRole) // role = user_premium o admin
    this.post   ('/:uid/documents', ['PUBLIC'], uploader.array('documents') , this.controller.adddocument) // TODO falta terminar
  }
}