import CartsController from "../../controller/cart.controller.js";
import { handleAuth } from "../../middleware/handlePoliciesPASP.js";
import CustomRouter from "./custom.route.js";

// http://localhost:PORT/api/carts/

const cControl = new CartsController()
export default class CartCRouter extends CustomRouter {
  constructor() {
    super(cControl);
    this.init();
    this.initCustomRoutes();
  }
  // init() {
  //   this.get    ('/',       handleAuth(['USER', 'ADMIN']), this.controller.gets)
  //   this.get    ('/:eid',   handleAuth(['USER', 'ADMIN']), this.controller.getId)
  //   this.get    ('/filter', handleAuth(['USER', 'ADMIN']), this.controller.getBy)
  //   this.post   ('/',       handleAuth(['USER', 'ADMIN']), this.controller.create)
  //   this.put    ('/:eid',   handleAuth(['USER', 'ADMIN']), this.controller.updateId)
  //   this.delete ('/:eid',   handleAuth(['USER', 'ADMIN']), this.controller.deleteId)
  // }
  
  initCustomRoutes() {
    this.post  ('/:cid/product/:pid', handleAuth(['USER']), this.controller.addProduct)
    this.put   ('/:cid/product/:pid', handleAuth(['USER']), this.controller.removeOneUnit)
    this.delete('/:cid/product/:pid', handleAuth(['USER']), this.controller.removeProductById)
    
    this.post  ('/:eid/purchase', handleAuth(['USER']), this.controller.purchase)
  }
}