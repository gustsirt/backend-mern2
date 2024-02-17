import ProductsController from "../../controller/products.controller.js";
import CustomRouter from "./custom.route.js";

// * http://localhost:PORT/api/products

const cControl = new ProductsController()
export default class ProductCRouter extends CustomRouter {
  constructor() {
    super(cControl);
  }
  init() {
    this.get    ("/group/categorys", this.controller.getCategorys )
  }
}