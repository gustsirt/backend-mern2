 import ProductsController from "../../controller/products.controller.js";
import { handleAuth } from "../../middleware/handlePoliciesPASP.js";
import CustomRouter from "./custom.route.js";

// * http://localhost:PORT/api/products

const cControl = new ProductsController()
export default class ProductCRouter extends CustomRouter {
  constructor() {
    super(cControl);
    this.init();
  }
  init() {
    this.get    ('/',       handleAuth(['PUBLIC']), this.controller.gets)
    this.get    ('/:eid',   handleAuth(['PUBLIC']), this.controller.getId)
    this.get    ('/filter', handleAuth(['PUBLIC']), this.controller.getBy)
    this.post   ('/',       handleAuth(['USER_PREMIUM','ADMIN']) , this.controller.create)
    this.put    ('/:eid',   handleAuth(['USER_PREMIUM','ADMIN']) , this.controller.updateId)
    this.delete ('/:eid',   handleAuth(['USER_PREMIUM','ADMIN']) , this.controller.deleteId)
    this.get    ("/group/categorys", handleAuth(['PUBLIC']), this.controller.getCategorys )
  }
}

