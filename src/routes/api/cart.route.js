import CartsController from "../../controller/cart.controller.js";
import CustomRouter from "./custom.route.js";

// http://localhost:PORT/api/carts/

const cControl = new CartsController()
export default class CartCRouter extends CustomRouter {
  constructor() {
    super(cControl);
    this.init();
    this.initCustomRoutes();
  }

  initCustomRoutes() {
    this.post  ('/:cid/product/:pid', this.controller.addProduct)
    this.put   ('/:cid/product/:pid', this.controller.updateProductQuantity) //+ body quantity
    this.delete('/:cid/product/:pid', this.controller.removeProductById)
    
  }
}