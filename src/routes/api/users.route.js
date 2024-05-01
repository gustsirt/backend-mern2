import UsersController from "../../controller/users.controller.js";
import { handleAuth } from "../../libraries/middleware/handlePoliciesPASP.js";
import uploader from "../../utils/multer.js";
import CustomRouter from "../../libraries/custom/router.class.js";

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
    this.get    ('/access/:uid/:role', this.controller.switchRole) // role = user_premium o admin
    this.post   ('/:uid/documents', uploader.array('documents') , this.controller.adddocument)
  }
}