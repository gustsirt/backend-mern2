import CartsController from "./controller.js";
import CustomRouterAuth from "../../../libraries/custom/router.auth.class.js";

// http://localhost:PORT/api/carts/

const cControl = new CartsController()
export default class CartCRouter extends CustomRouterAuth {
  constructor() {
    super(cControl);
    this.init();
  }
  init() {
    this.get   ('/',       ['PUBLIC'], this.controller.gets)
    this.get   ('/:eid',   ['PUBLIC'], this.controller.getId)
    this.post  ('/:cid/product/:pid', ['USER'], this.controller.addProduct)
    this.put   ('/:cid/product/:pid', ['USER'], this.controller.removeOneUnit)
    this.delete('/:cid/product/:pid', ['USER'], this.controller.removeProductById)
    this.post  ('/:eid/purchase', ['USER'], this.controller.purchase)
  }
}